import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postInfo: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPostSuccess: (state, action) => {
      state.postInfo.push(action.payload);
    },
    updatePostSuccess: (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.postInfo.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.postInfo[postIndex] = updatedPost;
      }
    },
    likePostSuccess: (state, action) => {
      const likedPost = action.payload;
      const postIndex = state.postInfo.findIndex(
        (post) => post._id === likedPost._id
      );
      if (postIndex !== -1) {
        state.postInfo[postIndex] = likedPost;
      }
    },
    deletePostSuccess: (state, action) => {
      console.log(action.payload);
      const postId = action.payload;
      state.postInfo = state.postInfo.filter((post) => post._id !== postId);
    },

    fetchPostSuccess: (state, action) => {
      state.postInfo = action.payload;
    },
  },
});

export const {
  createPostSuccess,
  updatePostSuccess,
  likePostSuccess,
  deletePostSuccess,
  fetchPostSuccess,
} = postsSlice.actions;

export default postsSlice?.reducer;
