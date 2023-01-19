import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import DisplayTweets from "./Feed/DisplayTweets";
import { useDispatch, useSelector  } from "react-redux";
import { editProfileModal } from "../Redux/features/GlobalSlice";
import { useRouter } from "next/router";
import { AiOutlineLink } from "react-icons/ai";
import axiosAPI from "../axios.js";
import { postType, profileType } from "../Types/Feed.types";



function Profile() {
  const { data: session } = useSession();
  const [profilePosts, setProfilePosts] = useState([]);
  const [profileData, setProfileData] = useState<profileType>();
  const router = useRouter();
  const profileDataChanged = useSelector(
    (state : any) => state.global.profileDataChanged
  );
  const newUserId = router?.query?.component && router?.query?.component[1];
  const dataChanged = useSelector((state : any  ) => state.global.dataChanged);
  const userId: string | null =
    newUserId || JSON.parse(window.sessionStorage.getItem("userId")??"")?.userId;
  const dispatch = useDispatch();
  useEffect(() => {
    // ----------------------   profile creation if not exists ------------------------------------
    async function profile() {
      const data = {
        userId: userId,
        userImage: session?.user?.image,
        name: session?.user?.name,
      };
      const response = await axiosAPI.post("/profile", JSON.stringify(data));
    }
    profile();
    // -------------------------------------------- fetching Profile Data --------------------
    async function fetchProfileData() {
      const profileData = await axiosAPI
        .post("/profiledata", JSON.stringify({ userId: userId }))
        .then(async (res) => await res.data);
      setProfileData(profileData);
    }
    fetchProfileData();
  }, [router.query.component, session, profileDataChanged]);

  useEffect(() => {
    async function fetchingProfilePosts() {
      const profilePosts = await axiosAPI
        .post("/profileposts", JSON.stringify({ userId: userId }))
        .then((res) => res.data);
      setProfilePosts(profilePosts);
    }
    fetchingProfilePosts();
  }, [dataChanged, router.query.component]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <Link passHref href={"/"}>
          <a>
            <IoArrowBackSharp
              title="back"
              className="cursor-pointer rounded-full p-1 text-[2.3rem] hover:bg-gray-300"
            />
          </a>
        </Link>

        <section>
          <p>{profileData?.name}</p>
          <p>{profilePosts?.length} Tweets</p>
        </section>
      </div>
      <div className="relative flex flex-col ">
        <img
          className="h-[12rem]"
          height="200"
          width="700"
          src={
            profileData?.backgroundImage ||
            "https://thumbs.dreamstime.com/b/technology-banner-background-old-new-using-computer-circuits-old-machine-cogs-37036025.jpg"
          }
        />
        <div className="absolute top-[8rem] left-[2rem] h-[7rem] w-[7rem] rounded-full border-4 border-white">
          <Image
            className="rounded-full"
            layout="fill"
            src={profileData?.userImage || "https://links.papareact.com/drq"}
          ></Image>
        </div>

        {newUserId && userId !== newUserId ? (
          ""
        ) : (
          <p
            onClick={() => {
              dispatch(editProfileModal());
            }}
            className=" ml-auto  mt-2 mr-4 cursor-pointer rounded-3xl border-[0.1rem] p-2 px-4 font-semibold "
          >
            Edit profile
          </p>
        )}
      </div>
      <div
        className={` flex flex-col gap-2 pl-4 ${
          newUserId && userId !== newUserId && " pt-12  "
        }`}
      >
        <p>{profileData?.name}</p>
        <p>{profileData?.userId}</p>
        <p>{profileData?.bio}</p>

        <div className="flex gap-4   ">
          <div className="flex items-center gap-2  ">
            <MdOutlineBusinessCenter />
            <p>Community</p>
          </div>
          <div className=" flex items-center gap-2  ">
            <GoCalendar />
            <p>
              Joined
              {/* <Moment fromNow>{profileData.createdAt}</Moment> */}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineLink />
            <a
              href={profileData?.website}
              target="_blank"
              className=" text-twitter "
            >
              {profileData?.website?.slice(0, 20) + "..."}
            </a>
          </div>
        </div>
        <div className="mb-2 flex gap-4 pb-2">
          <div className="flex gap-2">
            <p className="font-bold">0</p>
            <p>Following</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">0</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
      {profilePosts?.map((post: postType) => (
        <DisplayTweets key={post?._id} post={post} />
      ))}
    </div>
  );
}

export default Profile;
