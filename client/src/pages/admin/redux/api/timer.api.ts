import { createApi } from '@reduxjs/toolkit/query/react';
import { Timer } from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const timerApi = createApi({
  reducerPath: 'timer',
  tagTypes: ['Timers'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'timer',
  }),
  endpoints: (build) => ({
    getAll: build.query<Array<Timer>, void>({
      query: () => ({ url: 'all' }),
      providesTags: ['Timers'],
    }),
    startAll: build.mutation<Timer, Array<number>>({
      query: (teams: Array<number>) => ({
        url: 'start',
        method: 'PUT',
        body: {
          teams,
        },
      }),
      invalidatesTags: ['Timers'],
    }),
    stop: build.mutation<Timer, number>({
      query: (team: number) => ({
        url: 'stop',
        method: 'PUT',
        body: {
          team,
        },
      }),
      invalidatesTags: ['Timers'],
    }),
  }),
});

export default timerApi;
