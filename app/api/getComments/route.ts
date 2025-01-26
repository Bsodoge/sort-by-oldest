import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

export async function GET() {
  getComments("4TLE4RLjf-4");
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
  console.log(response.data.items?.[0].snippet?.topLevelComment?.snippet?.textDisplay);
}