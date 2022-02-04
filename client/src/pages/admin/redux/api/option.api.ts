import { createApi } from '@reduxjs/toolkit/query/react';
import { Option } from '../../../../types';
import baseQueryWithAuth from './baseQueryWithAuth';

const optionApi = createApi({
  reducerPath: 'option',
  tagTypes: ['LapTime', 'CompanyImage', 'MapImage'],
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
    getCompanyImage: build.query<Option<string>, void>({
      query: () => ({ url: 'company-image' }),
      providesTags: ['CompanyImage'],
    }),
    uploadCompanyImage: build.mutation<string, FormData>({
      query: (body) => ({
        url: 'company-image',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CompanyImage'],
    }),
    getMapImage: build.query<Option<string>, void>({
      query: () => ({ url: 'map-image' }),
      providesTags: ['MapImage'],
    }),
    uploadMapImage: build.mutation<string, FormData>({
      query: (body) => ({
        url: 'map-image',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['MapImage'],
    }),
  }),
});

export default optionApi;
