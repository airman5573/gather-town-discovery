import { createApi } from '@reduxjs/toolkit/query/react';
import { CheckDto, MissionUploadEntity } from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const missionUploadApi = createApi({
  reducerPath: 'mission-upload',
  tagTypes: ['MissionUploadFiles'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'mission-upload',
  }),
  endpoints: (build) => ({
    getAll: build.query<Array<MissionUploadEntity>, void>({
      query: () => ({ url: 'all' }),
      providesTags: ['MissionUploadFiles'],
    }),
    check: build.mutation<MissionUploadEntity, CheckDto>({
      query: (body) => ({
        url: 'check',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['MissionUploadFiles'],
    }),
  }),
});

export default missionUploadApi;
