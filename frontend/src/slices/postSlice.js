import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postInfo: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPostStore: (state, action) => {
      state.postInfo?.data?.push(action?.payload);
    },
    updatePostStore: (state, action) => {
      const updatedPost = action?.payload;
      const postIndex = state?.postInfo?.data?.findIndex(
        (post) => post?._id === updatedPost?._id
      );
      if (postIndex !== -1) {
        state.postInfo.data[postIndex] = updatedPost;
      }
    },
    likePostStore: (state, action) => {
      const likedPost = action.payload;
      const postIndex = state.postInfo?.data?.findIndex(
        (post) => post?._id === likedPost?._id
      );
      if (postIndex !== -1) {
        state.postInfo.data[postIndex] = likedPost;
      }
    },
    deletePostStore: (state, action) => {
      const postId = action?.payload;
      state.postInfo.data = state.postInfo?.data?.filter((post) => post?._id !== postId);
    },

    fetchPostStore: (state, action) => {
      state.postInfo = action?.payload;
    },
  },
});

export const {
  createPostStore,
  updatePostStore,
  likePostStore,
  deletePostStore,
  fetchPostStore,
} = postsSlice.actions;

export default postsSlice?.reducer;
