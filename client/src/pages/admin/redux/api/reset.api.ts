import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from './baseQueryWithAuth';

const resetApi = createApi({
  reducerPath: 'reset',
  baseQuery: baseQueryWithAuth({
    baseUrl: 'reset',
  }),
  endpoints: (build) => ({
    reset: build.mutation<void, void>({
      query: () => ({
        url: '',
        method: 'PUT',
      }),
    }),
  }),
});

export default resetApi;
