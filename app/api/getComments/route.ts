import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

export async function POST(req: Request) {
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