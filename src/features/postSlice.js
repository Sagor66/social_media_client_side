import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Read all the posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (user_id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?user_id=${user_id}`);
  return res.data;
});

// Create Posts
export const createPost = createAsyncThunk("posts/createPost", async (newPostData) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, newPostData);
  return res.data;
});

// Update Posts
export const updatePost = createAsyncThunk("posts/updatePost", async ({ postId, updatedData }) => {
  const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, updatedData);
  // console.log({ updatedData })
  return res.data;
});

// Delete Post
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`);
  return postId;
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    posts: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetching
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = action.error.message;
    });

    // Creating
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      state.error = null;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Updating
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.error = null;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Deleting
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const deletedPostId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== deletedPostId);
      state.error = null;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
