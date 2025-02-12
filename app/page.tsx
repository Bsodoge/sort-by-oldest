'use client';

import { useState } from "react";
import Form from "./components/Form";
import Comment from "./components/Comment";
import github from "../public/github-mark.svg"
import Image from "next/image";

export default function Home() {
  const [comments, setComments] = useState([]);
  return (
    <div className="text-black">
      <header className="flex p-2">
        <a href="https://github.com/Bsodoge/sort-by-oldest" target="_blank">
          <Image width={32} height={32} src={github} alt="Github Logo" className=""/>
        </a>
      </header>
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl">Sort by Oldest</h1>
          <h2 className="text-2xl">Find comments from a <em className="italic">long</em> time ago...</h2>
        </div>
        <Form setComments={setComments}></Form>
        <div className="flex flex-col p-0 w-full mt-10 sm:w-3/4 sm:p-10 sm:items-center ">
          {
            comments.length ? comments.map((comment: any) => <Comment
            key={comment.id} 
            content={comment.snippet.topLevelComment.snippet.textDisplay} 
            publishedAt={comment.snippet.topLevelComment.snippet.updatedAt}
            author={comment.snippet.topLevelComment.snippet.authorDisplayName}
            likes={comment.snippet.topLevelComment.snippet.likeCount}
            profileImage={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}/>) : <></>
          }
          {
            comments.length ? comments.length === 100 ? <span className="mt-6">We currently only support viewing 100 of the oldest comments. Sorry for the inconvenience!</span> : <span className="mt-6">You've reached the end of the comments...</span> : <></>
          }
        </div>
      </div>
    </div>
  );
}
