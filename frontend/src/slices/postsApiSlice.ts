import { apiSlice } from './apiSlice';
import { PostType } from '../components/types/post.types';
import { CurrentPagePosts } from '../components/types/post.types';
const POSTS_URL = '/api/posts';

interface GetPostsParams {
  page: string;
}

interface SendPostsData {
  creator?: string;
  message?: string;
  selectedFile?: string;
  tags?: string[];
  title?: string;
}

interface UpdatePostParams {
  id: string;
  data: {
    createdAt?: string;
    creator?: string;
    likeCount?: number;
    message?: string;
    selectedFile?: string;
    tags?: string[];
    title?: string;
    __v?: number;
    _id?: string;
  };
}

interface LikePostParams {
  id: string;
  data: number;
}

export const postsApiSlice = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder?.query<PostType[] | CurrentPagePosts, GetPostsParams>({
      query: ({ page }) => {
        return {
          url: `${POSTS_URL}?page=${page}`,
        };
      },
    }),
    sendPosts: builder?.mutation<PostType, SendPostsData>({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePost: builder?.mutation<PostType, UpdatePostParams>({
      query: ({ id, data }) => {
        return {
          url: `${POSTS_URL}/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    deletePost: builder?.mutation<{ message: string }, string>({
      query: (id) => {
        return {
          url: `${POSTS_URL}/${id}`,
          method: 'DELETE',
        };
      },
    }),
    likePost: builder?.mutation<PostType, LikePostParams>({
      query: ({ id, data }) => {
        return {
          url: `${POSTS_URL}/${id}/likePost`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSendPostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
} = postsApiSlice;
