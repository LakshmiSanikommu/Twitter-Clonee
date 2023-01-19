import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axiosAPI from "../../axios";
import { profileType } from "../../Types/Feed.types";

type propsType = {
  profile: profileType;
  online : Boolean;
}

function ProfileSection({ profile, online } : propsType) {
  const { data: session } = useSession();
  
  const arr = [
    profile?.userId,
    "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
  ].sort();
  const conversationId = arr[0] + "-" + arr[1];

  async function conversationCreation() {
    await axiosAPI.post(
      "/conversation/creation",
      JSON.stringify({ conversationId: conversationId })
    );
  }

  return (
    <Link passHref href={`/user/Messages/${conversationId}`}>
      <div
        onClick={conversationCreation}
        className=" relative  flex h-[5rem]  cursor-pointer items-center gap-2 rounded-xl border-[0.1rem] px-2 hover:bg-gray-200"
      >
        {online && (
          <span className="absolute top-0 left-0 flex h-[1rem] w-[1rem] rounded-full bg-twitter  ">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          </span>
        )}

        <div className="relative h-[3rem] w-[3rem] ">
          <Image
            layout="fill"
            className="rounded-full "
            src={profile?.userImage || "https://links.papareact.com/drq"}
          ></Image>
        </div>

        <div className=" flex flex-col py-6  ">
          <p>
            {profile?.name.length < 15
              ? profile?.name
              : profile?.name.slice(0, 15) + "..."}
          </p>
          <p className="text-gray-500">
            {profile?.userId.length < 15
              ? profile?.userId
              : profile?.userId.slice(0, 15) + "..."}
          </p>
          <p className="text-gray-500">
            {profile?.bio.length < 15
              ? profile?.bio
              : profile?.bio.slice(0, 15) + "..."}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProfileSection;
