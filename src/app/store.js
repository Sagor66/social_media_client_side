import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import commentReducer from "../features/commentSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer
  },
});

export default store;
