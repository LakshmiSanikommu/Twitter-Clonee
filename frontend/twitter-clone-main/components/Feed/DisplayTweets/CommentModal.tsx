import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { modalStateChainging } from "../../../Redux/features/CommentSlice";
import { clicked } from "../../../Redux/features/GlobalSlice";
import Icons from "../Icons";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import axiosAPI from "../../../axios";

type replyState = {
  postId: string;
  replyData: string;
  userImage: string | null | undefined;
  userId: string | null | undefined;
  tweetUserId: string;
  userName: string;
};

export default function CommentModal() {
  const [reply, setReply] = useState("")

  // ------------------------   Redux ----------------------------------
  const modalState = useSelector((state: any) => state.comment.modalState);
  const post = useSelector((state: any) => state.comment.post);
  const dispatch = useDispatch();


  const {data : session} = useSession();
    const data: replyState = {
      postId: post?._id,
      replyData: reply,
      userImage: session?.user?.image,
      userId: session?.user?.name?.split(" ")[0].toLocaleLowerCase(),
      tweetUserId: post?.userId,
      userName: post?.userName,
    };

  function handleReply() {
    axiosAPI.post("/comments", JSON.stringify(data)).then(() => {
      setReply("");
       dispatch(clicked());
      console.log("reply added successfully");
    });
    dispatch(modalStateChainging())
   
  }

  
  return (
    <div
      className={` absolute inset-0 bg-black/30 flex justify-center  ${
        modalState ? "inline" : "hidden"
      } `}
    >
      <div className="flex flex-col  bg-white p-3 h-[25rem] max-h-[30rem] min-w-[35rem]  mt-20 rounded-xl">
        <BiX
          onClick={() => dispatch(modalStateChainging())}
          title="Close"
          className="w-[2rem] h-[2rem] hover:bg-gray-300 rounded-full   "
        />

        <section className="py-8 flex  ">
          <div className="flex flex-col items-center  w-[3rem]">
            <Image
              className="rounded-full"
              src={post?.userImage || "https://links.papareact.com/drq"}
              width="45"
              height="45"
            ></Image>
            <div className="h-[3rem] border-[0.1rem] my-2"></div>
            <Image
              className="rounded-full"
              src={session?.user?.image || "https://links.papareact.com/drq"}
              width="45"
              height="45"
            ></Image>
          </div>
          <div className="p-2">
            <section className="flex ">
              <h1 className="font-bold pr-2">{post?.userName}</h1>
              <p className="pr-2 text-gray-500">{post?.userId} . </p>
              {/* <Moment className="text-gray-500" fromNow>
                {post?.createdAt}
              </Moment> */}
            </section>
            <p className="max-w-[28rem]">{post?.userInput}</p>
            <p className="flex p-3">
              Replying to{" "}
              <span className="text-twitter px-2">{post?.userId}</span>
            </p>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="outline-none text-[1.3rem] focus"
              autoFocus
              type="text"
              placeholder={`Tweet your reply ${session?.user?.name} `}
            ></input>
          </div>
        </section>

        {/* ---------------------  Bottom Part -------------------------------     */}

        <div className="mt-auto flex gap-32">
          <Icons />
          <div
            onClick={handleReply}
            className={`bg-twitter rounded-full p-1 px-4 font-bold text-white cursor-pointer ${
              reply ? "opacity-100" : "opacity-50"
            } `}
          >
            Reply
          </div>
        </div>
      </div>
    </div>
  );
}


