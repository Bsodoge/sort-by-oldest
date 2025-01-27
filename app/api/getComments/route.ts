import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

export async function GET() {
  let allComments: any[] = [];
  let currToken: any = "";
  let { comments, pageToken } = await getComments("Gu_etr834FM");
  allComments = allComments.concat(comments);
  currToken = pageToken;
  while(currToken) {
    let { comments , pageToken } = await getComments("Gu_etr834FM");
     allComments = allComments.concat(comments)
     currToken = pageToken; 
  }
  console.log(allComments.length);
  return Response.json({ h: "hi" })
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