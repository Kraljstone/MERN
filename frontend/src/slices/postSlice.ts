import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from '../components/types/post.types';
import { CurrentPagePosts } from '../components/types/post.types';

interface PostsState {
  postInfo: {
    data: PostType[];
  } | null;
}

const initialState: PostsState = {
  postInfo: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPostStore: (state, action: PayloadAction<PostType>) => {
      state.postInfo?.data?.push(action?.payload);
    },
    updatePostStore: (state, action: PayloadAction<PostType>) => {
      const updatedPost = action?.payload;
      const postIndex = state?.postInfo?.data?.findIndex(
        (post) => post?._id === updatedPost?._id
      ) as number;
      if (postIndex !== -1) {
        state.postInfo!.data[postIndex] = updatedPost;
      }
    },
    likePostStore: (state, action: PayloadAction<PostType>) => {
      const likedPost = action.payload;
      const postIndex = state.postInfo?.data?.findIndex(
        (post) => post?._id === likedPost?._id
      ) as number;
      if (postIndex !== -1) {
        state.postInfo!.data[postIndex] = likedPost;
      }
    },
    deletePostStore: (state, action: PayloadAction<string>) => {
      const postId = action?.payload;
      state.postInfo!.data =
        state.postInfo?.data?.filter((post) => post?._id !== postId) || [];
    },

    fetchPostStore: (
      state,
      action: PayloadAction<CurrentPagePosts | PostType[]>
    ) => {
      if (Array.isArray(action.payload)) {
        state.postInfo = { data: action.payload };
      } else {
        state.postInfo = action.payload;
      }
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
