import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// // Read all posts
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (user_id) => {
//     const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?user_id=${user_id}`);
//     return res.data;
//   });
  

// Read all the comments
export const fetchComments = createAsyncThunk("comments/fetchComments", async (user_id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments?user_id=${user_id}`);
  return res.data;
});

// Create Comments
export const createComment = createAsyncThunk("comments/createComment", async (newCommentData) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, newCommentData);
  return res.data;
});

// Delete Comment
export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId) => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/comments/${commentId}`);
  return commentId;
});

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    comments: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      state.error = null;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.comments = [];
      state.error = action.error.message;
    });

    // Creating
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
      state.error = null;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Deleting
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      const deletedCommentId = action.payload;
      state.comments = state.comments.filter((comment) => comment.id !== deletedCommentId);
      state.error = null;
    //   builder.dispatch(fetchPosts(state.user_id));
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
