import { createApi } from '@reduxjs/toolkit/query/react';
import { PointTable, PointTableEntity } from '../../../../types';
import baseQueryWithAuth from './baseQueryWithAuth';

const pointTableApi = createApi({
  reducerPath: 'point-table',
  tagTypes: ['PointTable'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'point-table',
  }),
  endpoints: (build) => ({
    getPointTable: build.query<PointTable, void>({
      query: () => ({ url: '' }),
      providesTags: ['PointTable'],
    }),
    updatePointTableItem: build.mutation<
      PointTableEntity,
      Partial<PointTableEntity>
    >({
      query: ({ key, point }) => ({
        url: `${key}`,
        method: 'PUT',
        body: {
          point,
        },
      }),
      invalidatesTags: ['PointTable'],
    }),
  }),
});

export default pointTableApi;
