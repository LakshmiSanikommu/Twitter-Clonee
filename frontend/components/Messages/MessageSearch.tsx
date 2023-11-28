import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ProfileSection from "./ProfileSection";
import { useSelector } from "react-redux";
import { profileType } from "../../Types/Feed.types";

type onlineUserType = {
  userId: string;
  socketId: string;
};

function MessageSearch() {
  const [profiles, setProfiles] = useState<profileType[]>([]);
  const [search, setSearch] = useState("");
  const onlineUsers = useSelector((state: any) => state.global.onlineUsers);
  console.log("onlineUsers: " + onlineUsers);
  console.log(onlineUsers);
  const sessionUserId = JSON.parse(
    window.sessionStorage.getItem("userId") ?? ""
  )?.userId;
  useEffect(() => {
    async function fetchingProfiles() {
      const profiles = await fetch("http://localhost:8001/profile").then(
        (res) => res.json()
      );
      setProfiles(profiles);
    }
    fetchingProfiles();
  }, []);
  // console.log("profiles data " + profiles);
  return (
    <div className=" col-span-2  flex flex-col gap-2  ">
      <h1 className="text-[1.4rem] font-bold ">Messages</h1>
      <div className=" flex items-center justify-center gap-2 rounded-full border-2 p-2 text-gray-400 ">
        <AiOutlineSearch />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[10rem] text-[0.8rem] outline-none "
          placeholder="Search Profile To Message"
        ></input>
      </div>
      <div className="flex flex-col gap-2 bg-gray-50 ">
        {profiles
          ?.filter(
            (profile) =>
              profile?.userId?.includes(search) &&
              profile?.userId != sessionUserId
          )
          .map((profile) => {
            let online: Boolean = false;
            onlineUsers.map((user: onlineUserType) => {
              if (user.userId === profile.userId) {
                online = true;
              }
            });
            return (
              <ProfileSection
                key={profile._id}
                profile={profile}
                online={online}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MessageSearch;
