import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

export async function GET() {
  getComments();
  return Response.json({ h: "hi" })
}


const getComments = async () => {
  const response = await youtube.commentThreads.list(
    {
      "part": [
        "snippet,replies"
      ],
      "videoId": "4TLE4RLjf-4",
      maxResults: 100,
      order: "time"
    }
  )
  console.log(response.data.items?.[0].snippet?.topLevelComment?.snippet?.textDisplay);
}