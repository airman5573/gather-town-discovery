import { createApi } from '@reduxjs/toolkit/query/react';
import { TeamPassword } from '../../../../types';
import baseQueryWithAuth from './baseQueryWithAuth';

const teamPasswordsApi = createApi({
  reducerPath: 'team-passwords',
  tagTypes: ['TeamPasswords'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'team-password',
  }),
  endpoints: (build) => ({
    getAll: build.query<Array<TeamPassword>, void>({
      query: () => ({ url: 'all' }),
      providesTags: ['TeamPasswords'],
    }),
    update: build.mutation<Array<TeamPassword>, Partial<Array<TeamPassword>>>({
      query: (teamPasswords: Array<TeamPassword>) => ({
        url: '',
        method: 'PUT',
        body: {
          teamPasswords,
        },
      }),
      invalidatesTags: ['TeamPasswords'],
    }),
  }),
});

export default teamPasswordsApi;
