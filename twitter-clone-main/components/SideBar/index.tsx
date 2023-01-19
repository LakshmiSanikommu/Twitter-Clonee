import React from "react";
import { IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { BsBookmark, BsCardList } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import SideBarItem from "./SideBarItem";
import Link from "next/link";
import { tweetBoxModal } from "../../Redux/features/GlobalSlice";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import Image from "next/image";

function SideBar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <div className="col-span-2 flex h-screen flex-col pt-2  ">
      <div className="flex max-w-[12rem] flex-col items-center gap-1  lg:items-start ">
        <Link passHref href="/">
          <div className="relative ml-4 h-[3rem] w-[3rem] rounded-full p-[0.3rem] hover:bg-blue-200 ">
            <Image
              layout="fill"
              src="https://links.papareact.com/drq"
              alt="twitter"
            ></Image>
          </div>
        </Link>

        <SideBarItem Icon={AiOutlineHome} text="Home" />
        <SideBarItem Icon={IoSearch} text="Search" />
        <SideBarItem Icon={BiHash} text="Explore" />
        <SideBarItem Icon={IoNotificationsOutline} text="Notifications" />
        <SideBarItem Icon={FiMail} text="Messages" />
        <SideBarItem Icon={BsBookmark} text="Bookmarks" />
        <SideBarItem Icon={BsCardList} text="Lists" />
        <SideBarItem Icon={HiOutlineUser} text="Profile" />
        <SideBarItem Icon={CgMoreO} text="More" />
        <div
          onClick={() => dispatch(tweetBoxModal())}
          className=" tweetButton "
        >
          Tweet
        </div>
      </div>
      <div className="signout">
        <div className="relative h-[2.5rem] w-[2.5rem]">
          <Image
            layout="fill"
            className=" rounded-full"
            src={session?.user?.image || "https://links.papareact.com/gll"}
          ></Image>
        </div>

        <p>@{session?.user?.name?.split(" ")[0].toLowerCase()}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="rounded-full bg-twitter bg-opacity-60 p-1 px-2"
        >
          SignOut
        </button>
      </div>
    </div>
  );
}

export default SideBar;
