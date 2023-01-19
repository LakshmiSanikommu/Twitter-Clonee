import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import { profileType } from "../../Types/Feed.types";

type onlineUserType = {
  userId: string;
  socketId: string; 
}

function MessageSearch() {
  const [profiles, setProfiles] = useState<profileType[]>([]);
  const [search, setSearch] = useState("");
  const onlineUsers = useSelector((state : any) => state.global.onlineUsers)
  console.log("onlineUsers: " + onlineUsers)
  console.log(onlineUsers)
  const sessionUserId = JSON.parse(
    window.sessionStorage.getItem("userId")??""
  )?.userId;
  useEffect(() => {
    async function fetchingProfiles() {
      const profiles = await fetch("http://localhost:5000/profile").then(
        (res) => res.json()
      );
      setProfiles(profiles);
    }
    fetchingProfiles();
    
  }, []);
  // console.log("profiles data " + profiles);
  return (
    <div className=" col-span-2  flex flex-col gap-2  ">
      <h1 className="font-bold text-[1.4rem] ">Messages</h1>
      <div className=" border-2 rounded-full text-gray-400 flex p-2 items-center justify-center gap-2 ">
        <AiOutlineSearch />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none text-[0.8rem] w-[10rem] "
          placeholder="Search Profile To Message"
        ></input>
      </div>
      <div className="bg-gray-50 gap-2 flex flex-col ">
        {profiles
          ?.filter(
            (profile) =>
              profile?.userId?.includes(search) &&
              profile?.userId != sessionUserId
          )
          .map((profile) => {
            let online : Boolean = false;
            onlineUsers.map((user : onlineUserType) => {
              if (user.userId === profile.userId) {
                online = true;
              }
            })
            return <ProfileSection key={profile._id} profile={profile} online={online} />;
          })}
      </div>
    </div>
  );
}

export default MessageSearch;
