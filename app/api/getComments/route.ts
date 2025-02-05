import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import dayjs from "dayjs";
import { google } from "googleapis";

const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, '60s'),
  timeout: 10000
})

export async function POST(req: Request) {

  const ip = ipAddress(req) ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await rateLimit.limit(ip);
  if(!success) {
    return Response.json({ message: "Rate limit exceeded "}, {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString()
      }
    })
  }
  let { link } = await req.json();
  let re = /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
  let videoId = link.match(re)![8];
  if(!videoId) {
    return Response.json({ message: "Bad data"}, {
      status: 400,
    })
  }
  let allComments: any[] = [];
  let currToken: any = "";
  let { comments, pageToken } = await getComments(videoId);
  allComments = allComments.concat(comments);
  currToken = pageToken;
  let fetch = 1;
  while(currToken) {
    console.log(currToken, " ", fetch)
    let { comments , pageToken } = await getComments(videoId, currToken);
    allComments = allComments.concat(comments)
    currToken = pageToken; 
    fetch++;
  }
  allComments.sort((a, b) => dayjs(a.snippet.topLevelComment.snippet.publishedAt).valueOf() - dayjs(b.snippet.topLevelComment.snippet.publishedAt).valueOf());
  console.log(allComments);
  return Response.json({ allComments })
}


const getComments = async (videoId: string, pageToken = "") => {
  const response = await youtube.commentThreads.list(
    {
      "part": [
        "snippet,replies"
      ],
      videoId,
      pageToken,
      maxResults: 100,
      order: "time"
    }
  )
  return {comments: response.data.items, pageToken: response.data.nextPageToken};
}