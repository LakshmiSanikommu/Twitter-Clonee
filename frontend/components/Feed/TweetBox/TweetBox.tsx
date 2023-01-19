import React, { useState, useRef } from "react";
import Icons from "../Icons";
import { useDispatch } from "react-redux";
import { tweetAdded } from "../../../Redux/features/GlobalSlice";
import { tweetBoxModal } from "../../../Redux/features/GlobalSlice";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axiosAPI from "../../../axios";

function TweetBox() {
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const tweetBoxModalState : Boolean = useSelector(
    (state: any) => state.global.tweetBoxModalState
  );

  function addDataToMongo() {
    const data = {
      userName: session?.user?.name,
      userImage: session?.user?.image,
      userEmail: session?.user?.email,
      userId:
        "@" + session?.user?.name?.split(" ").join("").toLocaleLowerCase(),
      timeStamp: new Date(),
      userInput: input,
    };

    axiosAPI.post("/tweets", JSON.stringify(data)).then(() => {
      setInput("");
      dispatch(tweetAdded());
      tweetBoxModalState && dispatch(tweetBoxModal());
      console.log("tweet added to the mongoDB");
    });
  }

  return (
    <div className="flex p-2 ">
      <Link passHref href={"/user/profile"}>
        <div className="relative h-[2.5rem] w-[2.5rem] ">
          <Image
            layout="fill"
            className=" m-2 rounded-full"
            src={session?.user?.image || "https://links.papareact.com/gll"}
          ></Image>
        </div>
      </Link>

      <div className=" flex flex-1 flex-col   ">
        <textarea
          className="p-3 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          cols={50}
          rows={tweetBoxModalState ? 7 : 3}
          placeholder={
            `what's happening ` + session?.user?.name?.split(" ")[0] + " ?"
          }
        ></textarea>
        <div
          className={`mt-auto flex justify-between ${
            tweetBoxModalState && " border-t-2 "
          }`}
        >
          {/* Icons */}
          <Icons />
          <section className="flex items-center">
            {input && (
              <p className={` ${input.length > 256 && " text-red-500 "}   `}>
                {256 - input?.length}
              </p>
            )}

            <button
              className="m-2 rounded-full bg-twitter p-1 px-3 font-bold text-white disabled:opacity-60"
              disabled={!input || input.length > 256}
              onClick={addDataToMongo}
            >
              Tweet
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
