import { apiSlice } from './apiSlice';
const USERS_URL: string = '/api/users';

interface LoginData {
  email: string;
  password: string;
}

interface RegistrationData {
  email: string;
  name: string;
  password: string;
}

interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
  _id: string;
}

export const userApiSlice = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    login: builder?.mutation({
      query: (loginData: LoginData) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: loginData,
      }),
    }),
    logout: builder?.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder?.mutation({
      query: (registrationData: RegistrationData) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: registrationData,
      }),
    }),
    updateUser: builder?.mutation({
      query: (updateUserData: UpdateUserData) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: updateUserData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
