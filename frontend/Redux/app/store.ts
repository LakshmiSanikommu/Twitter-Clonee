import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import commentReducer from "../features/CommentSlice";
import globalReducer from "../features/GlobalSlice"
// import reduxLogger from "redux-logger"

// const logger = reduxLogger.createLogger()

const store = configureStore({
  reducer: {
    comment: commentReducer,
    global: globalReducer,
  },
  // middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
