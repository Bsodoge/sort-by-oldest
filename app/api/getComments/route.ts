import { google } from "googleapis";
const youtube = google.youtube({version: "v3", auth: process.env.API_KEY});

export async function GET() {
  let allComments: any[] = [];
  let currToken: any = "";
  let { comments, pageToken } = await getComments("gnn0vAc8KuI");
  allComments = allComments.concat(comments);
  currToken = pageToken;
  let fetch = 1;
  while(currToken) {
    console.log(currToken, " ", fetch)
    let { comments , pageToken } = await getComments("gnn0vAc8KuI", currToken);
    allComments = allComments.concat(comments)
    currToken = pageToken; 
    fetch++;
  }
  //for(let i = 0; i < allComments.length; i++){
    //console.log(allComments[i].snippet);
  //}
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