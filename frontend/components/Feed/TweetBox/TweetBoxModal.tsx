import React from 'react'
import TweetBox from './TweetBox'
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { tweetBoxModal } from '../../../Redux/features/GlobalSlice';


function TweetBoxModal() {
    const dispatch = useDispatch();
    const tweetBoxModalState = useSelector((state : any ) => state.global.tweetBoxModalState)
  return (
    <div
      className={` absolute inset-0 bg-black/30 flex justify-center  ${
        tweetBoxModalState ? "inline" : "hidden"
      } `}
    >
      <div className="flex flex-col bg-white min-w-[35rem] mt-8 p-4 rounded-lg h-[20rem]">
        <BiX
          onClick={() => dispatch(tweetBoxModal())}
          title="Close"
          className="w-[2rem] h-[2rem] bg-gray-300 rounded-full   "
        />
        <TweetBox />
      </div>
    </div>
  );
}

export default TweetBoxModal