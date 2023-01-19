import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tweetAdded: 0,
  commentAdded: 0,
  dataChanged: 0,
  profileDataChanged: 0,
  chatUpdate : 0,
  tweetBoxModalState: false,
  editProfileModalState: false,
  onlineUsers : []
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    tweetAdded: (state) => {
      state.tweetAdded += 1;
    },
    commentAdded: (state) => {
      state.commentAdded += 1;
    },
    tweetBoxModal: (state) => {
      state.tweetBoxModalState = !state.tweetBoxModalState;
    },
    editProfileModal: (state) => {
      state.editProfileModalState = !state.editProfileModalState;
    },

    clicked: (state) => {
      state.dataChanged += 1;
    },
    profileDataChainging: (state) => {
      state.profileDataChanged += 1;
    },
    updatingChat: (state) => {
      state.commentAdded += 1;
    },
    settingOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
      
    }
  },
});

export const {
  tweetAdded,
  commentAdded,
  tweetBoxModal,
  clicked,
  editProfileModal,
  profileDataChainging,
  updatingChat,
  settingOnlineUsers,
} = globalSlice.actions;
export default globalSlice.reducer;
