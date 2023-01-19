import { HiOutlineRefresh } from "react-icons/hi";
import DisplayTweets from "./DisplayTweets";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TweetBox from "./TweetBox/TweetBox";
import { useSelector } from "react-redux";
import { postType } from "../../Types/Feed.types";

function Feed() {
  const [allPosts, setAllPosts] = useState<postType[]>([]);
  const tweetAdded = useSelector((state: any) => state.global.tweetAdded);
  const dataChanged = useSelector((state: any) => state.global.dataChanged);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch("http://localhost:5000/tweets").then((res) =>
        res.json()
      );
      setAllPosts(data);
    };
    getPosts();
  }, [tweetAdded, dataChanged]);

  return (
    <div className=" scrollbar-hide col-span-7 mr-2 max-h-screen overflow-scroll border-x-[0.1rem] lg:col-span-5 ">
      <div className="flex justify-between p-2 ">
        <h2>Home</h2>
        <HiOutlineRefresh />
      </div>
      {/* Tweet box  */}
      <TweetBox />
      {allPosts?.map((post) => {
        return <DisplayTweets key={uuidv4()} post={post} />;
      })}
    </div>
  );
}

export default Feed;

// need to implement data fetching in the getserver side props

// export async function getStaticProps() {
//     const data = await fetch("http://localhost:5000/tweets").then((res) =>
//       res.json()
//     );
//   console.log("😇 data"+data)

//   return {
//     props: {
//       allPostsData : data
//     }
//   }
// }
