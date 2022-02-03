import { createApi } from '@reduxjs/toolkit/query/react';
import { Option } from '../../../../types';
import baseQueryWithAuth from './baseQueryWithAuth';

const optionApi = createApi({
  reducerPath: 'option',
  tagTypes: ['LapTime'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'options',
  }),
  endpoints: (build) => ({
    getLapTime: build.query<Option<number>, void>({
      query: () => ({ url: 'lap-time' }),
      providesTags: ['LapTime'],
    }),
    updateLapTime: build.mutation<Option<number>, { lapTime: number }>({
      query: ({ lapTime }) => ({
        url: `lap-time`,
        method: 'PUT',
        body: {
          lapTime,
        },
      }),
      invalidatesTags: ['LapTime'],
    }),
  }),
});

export default optionApi;
