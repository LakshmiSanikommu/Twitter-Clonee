import React from "react";
import Moment from "react-moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from "next/link";
import Actions from "./Actions";
import Image from "next/image";
import { postType } from "../../../Types/Feed.types";

function DisplayTweets({ post } : {post : postType} ) {
  return (
    <Link passHref href={`/${post.userId.slice(1)}/status/${post._id}`}>
      <div className="flex border-t-[0.1rem] p-2 hover:bg-gray-100">
        <div className="relative h-[3rem] w-[3.2rem] ">
          <Image
            layout="fill"
            className=" rounded-full "
            src={post?.userImage}
          ></Image>
        </div>

        <div className="w-full px-2 ">
          {/* Top  */}
          <section className="flex  items-center ">
            <p>
              {post?.userId} . <Moment fromNow>{post?.createdAt}</Moment>{" "}
            </p>
            <BiDotsHorizontalRounded className="ml-auto h-[1.2rem] w-[1.2rem]" />
          </section>
          <section className="p-4">{post?.userInput}</section>
          {/* icons */}
          <Actions post={post} />
        </div>
      </div>
    </Link>
  );
}

export default DisplayTweets;
