import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create Posts
export const createReaction = createAsyncThunk("reactions/createReaction", async (newPostData) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/reactions`, newPostData);
    return res.data;
  });

export const reactionSlice = createSlice({
  name: "reactions",
  initialState: {
    isLoading: false,
    reactions: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Creating
    builder.addCase(createReaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createReaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reactions.push(action.payload);
      state.error = null;
    });
    builder.addCase(createReaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default reactionSlice.reducer;
