import React from "react";

import SideBar from "../../../components/SideBar";
import Widgets from "../../../components/Widgets";
import CommentModal from "../../../components/Feed/DisplayTweets/CommentModal";
import TweetBoxModal from "../../../components/Feed/TweetBox/TweetBoxModal";
import SpecificTweetDisplay from "../../../components/SpecificTweetDisplay";
import axiosAPI from "../../../axios";

function specificTweet({ post }) {
  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto">
      <main className="grid grid-cols-9 ">
        <SideBar />
        <SpecificTweetDisplay post={post} />
        <Widgets />
        <CommentModal />
        <TweetBoxModal />
      </main>
    </div>
  );
}

export default specificTweet;

export async function getServerSideProps(context) {
  const data = {
    _id: context.params?.tweetId,
  };

  console.log("🥶 this is context" + context);

  const post = await axiosAPI.post("/tweet",JSON.stringify(data)).then((res) => res.data);

  return {
    props: {
      post: post,
    },
  };
}
