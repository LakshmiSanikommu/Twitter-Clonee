import React from "react";
import Link from "next/link";
import Image from "next/image";

function ViewProfile({ profile, clearInput }) {
  function handleClick() {
    clearInput();
  }

  return (
    <Link passHref href={`/user/Profile/${profile?.userId}`}>
      <div
        onClick={handleClick}
        className="flex h-[5rem]  cursor-pointer items-center gap-2 rounded-xl border-[0.1rem] px-2 hover:bg-gray-200"
      >
        <div className="relative h-[3rem] w-[3rem]">
          <Image
            layout="fill"
            className="rounded-full "
            src={profile?.userImage}
          ></Image>
        </div>

        <div className=" flex flex-col py-6 ">
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

export default ViewProfile;
