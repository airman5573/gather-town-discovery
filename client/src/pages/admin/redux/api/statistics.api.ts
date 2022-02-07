import { createApi } from '@reduxjs/toolkit/query/react';
import { TeamStatistics } from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const statisticsApi = createApi({
  reducerPath: 'statistics',
  tagTypes: ['Statistics'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'statistics',
  }),
  endpoints: (build) => ({
    getStatistics: build.query<Array<TeamStatistics>, void>({
      query: () => ({ url: '' }),
      providesTags: ['Statistics'],
    }),
  }),
});

export default statisticsApi;
