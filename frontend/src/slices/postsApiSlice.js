import { apiSlice } from './apiSlice';
const POSTS_URL = '/api/posts';

export const postsApiSlice = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder?.query({
      query: (page) => {
        return {
          url: `${POSTS_URL}?page=${page}`,
        };
      },
    }),
    sendPosts: builder?.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePost: builder?.mutation({
      query: ({ id, data }) => {
        return {
          url: `${POSTS_URL}/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    deletePost: builder?.mutation({
      query: (id) => {
        return {
          url: `${POSTS_URL}/${id}`,
          method: 'DELETE',
        };
      },
    }),
    likePost: builder?.mutation({
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
