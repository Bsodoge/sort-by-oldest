import { Ratelimit } from "@upstash/ratelimit";
import { ipAddress } from "@vercel/functions";
import { kv } from "@vercel/kv";
import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, '10s')
})

export const config = {
  runtime: 'edge'
}

export async function POST(req: Request) {
  const ip = ipAddress(req) ?? "127.0.0.1";
  const { limit, reset, remaining } = await rateLimit.limit(ip);
  if(remaining === 0) {
    return Response.json({ message: "Rate limit exceeded "}, {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString()
      }
    })
  }
  let { videoId } = await req.json();
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
  console.log(allComments.length);
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