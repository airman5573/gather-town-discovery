import { createApi } from '@reduxjs/toolkit/query/react';
import { TeamPoint, TeamPointEntity } from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const teamPointApi = createApi({
  reducerPath: 'team-point',
  tagTypes: ['TeamPoints'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'team-point',
  }),
  endpoints: (build) => ({
    getAll: build.query<Array<TeamPointEntity>, void>({
      query: () => ({ url: 'all' }),
      providesTags: ['TeamPoints'],
    }),
    updateAll: build.mutation<
      Array<TeamPointEntity>,
      { teamPoints: Array<TeamPoint> }
    >({
      query: (body) => ({
        url: 'all',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TeamPoints'],
    }),
    update: build.mutation<TeamPointEntity, TeamPoint>({
      query: (body) => ({
        url: '',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TeamPoints'],
    }),
  }),
});

export default teamPointApi;
