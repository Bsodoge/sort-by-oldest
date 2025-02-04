'use client';

import { useState } from "react";
import Form from "./components/Form";
import Comment from "./components/Comment";

export default function Home() {
  const [comments, setComments] = useState([]);
  return (
    <div className="">
      <header className="flex">
          <img src="" alt="Github Logo" />
      </header>
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl">Sort by Oldest</h1>
          <h2>Find comments from a <em className="italic">long</em> time ago...</h2>
        </div>
        <Form setComments={setComments}></Form>
        <div className="flex flex-col gap-16 p-10 justify-center items-center">
          {
            comments.length ? comments.map((comment: any) => <Comment 
            content={comment.snippet.topLevelComment.snippet.textDisplay} 
            publishedAt={comment.snippet.topLevelComment.snippet.updatedAt}
            author={comment.snippet.topLevelComment.snippet.authorDisplayName}
            likes={comment.snippet.topLevelComment.snippet.likeCount}
            profileImage={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}/>) : <></>
          }
        </div>
      </div>
    </div>
  );
}
