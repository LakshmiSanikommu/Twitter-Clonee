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
import { useRouter } from "next/router";
import EditProfileModal from "../../components/EditProfileModal";
import MessageSearch from "../../components/Messages/MessageSearch";


function All() {
  const router = useRouter();
  const comp = router?.query?.component && router?.query?.component[0] === "Messages"

  const switchComponent = (arg) => {
    // console.log(" args : " + arg);
    switch (arg) {
      case "Profile":
        return <Profile />;
      case "Lists":
        return <Lists />;
      case "Bookmarks":
        return <Bookmarks />;
      case "Explore":
        return <Explore />;
      case "Messages":
        return <Messages />;
      case "Notifications":
        return <Notifications />;
      case "Search":
        return <Search />;
      case "Home":
        return <Feed />;
    }
  };

  return (
    <div className=" max-h-screen overflow-hidden  max-w-6xl mx-auto">
      <main className="grid grid-cols-9 ">
        <SideBar />
        <div className=" col-span-7 lg:col-span-5 border-x-[0.1rem] mr-2 overflow-scroll max-h-screen  ">
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
