import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import Profile from "../../components/Profile";
import Widgets from "../../components/Widgets";
import TweetBoxModal from "../../components/Feed/TweetBox/TweetBoxModal";
import CommentModal from "../../components/Feed/DisplayTweets/CommentModal";
import Bookmarks from "../../components/Bookmarks";
import Lists from "../../components/Lists";
import Explore from "../../components/Explore";
import Messages from "../../components/Messages";
import Notifications from "../../components/Notifications";
import Search from "../../components/Search";
import Feed from "../../components/Feed";
import FundMe from "../../components/EthersFundMe";
import { useRouter } from "next/router";
import EditProfileModal from "../../components/EditProfileModal";
import MessageSearch from "../../components/Messages/MessageSearch";
import Head from "next/head";

function All() {
  const router = useRouter();
  const comp =
    router?.query?.component && router?.query?.component[0] === "Messages";

  const switchComponent = (arg) => {
    // console.log(" args : " + arg);
    switch (arg) {
      case "profile":
        return <Profile />;
      case "lists":
        return <Lists />;
      case "bookmarks":
        return <Bookmarks />;
      case "explore":
        return <Explore />;
      case "messages":
        return <Messages />;
      case "notifications":
        return <Notifications />;
      case "search":
        return <Search />;
      case "home":
        return <Feed />;
      case "fundme":
        return <FundMe />;
    }
  };

  return (
    <div className=" mx-auto max-h-screen  max-w-6xl overflow-hidden ">
      <Head>
        <title>{router?.query?.component && router.query.component[0]}</title>
      </Head>
      <main className="grid grid-cols-9 ">
        <SideBar />
        <div className=" col-span-7 mr-2 max-h-screen overflow-scroll border-x-[0.1rem] lg:col-span-5 p-2 ">
          {" "}
          {switchComponent(
            router?.query?.component && router.query.component[0]
          )}
        </div>

        {comp ? <MessageSearch /> : <Widgets />}
        <CommentModal />
        <TweetBoxModal />
        {router?.query?.component &&
          router.query.component[0] === "Profile" && <EditProfileModal />}
      </main>
    </div>
  );
}

export default All;
