import { apiSlice } from './apiSlice';
const POSTS_URL = '/api/posts';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (data) => ({
        url: `${POSTS_URL}`,
        body: data,
      }),
    }),
    sendPosts: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useSendPostsMutation } = postsApiSlice;
