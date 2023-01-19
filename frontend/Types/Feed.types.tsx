type commentType = {
  postId: string;
  replyData: string;
  userImage: string;
  userId: string;
  tweetUserId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

type likeType = {
  userId : string;
}
// postType of tweetType refers to same if defined anywhere 

type postType = {
  _id?: string;
  userEmail: string;
  userId: string;
  userImage: string;
  userName: string;
  userInput: string;
  postImage: string;
  comments: [commentType];
  likes: [likeType];
  retweets: [];
  createdAt: Date;
  updatedAt : Date;
};

type profileType = {
  _id? : string;
  backgroundImage: string;
  userId: string;
  // newUserId? : string;
  userImage: string | null | undefined;
  name: string;
  bio: string;
  location: string;
  website: string;
  birthDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

type messageType = {
  _id? : string;
  senderId: string;
  receiverId: string;
  msg: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type conversationType = {
  conversationId: string;
  messages : [messageType]
}

export type {
  postType,
  profileType,
  conversationType,
  commentType,
  messageType,
};
  
