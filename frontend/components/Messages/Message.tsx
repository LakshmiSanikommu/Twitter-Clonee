import React, { useRef } from "react";
import { messageType } from "../../Types/Feed.types";

type propsType = {
  msg: messageType;
  scrollRef: React.MutableRefObject<HTMLDivElement>;
};

function Message({ msg, scrollRef }: propsType) {
  const sessoinId = JSON.parse(
    window.sessionStorage.getItem("userId") ?? ""
  )?.userId;
  const blue = sessoinId === msg.senderId;
  // console.log("sessionId : " + sessoinId + " msg.senderid : " + msg.senderId)

  return (
    <div ref={scrollRef} className={`  ${ blue ? " ml-auto bg-twitter " : "mr-auto bg-gray-100 " }  m-1 rounded-full px-3  `}>
      {msg.msg}
    </div>
  );
}

export default Message;
