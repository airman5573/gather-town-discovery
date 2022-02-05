import { createApi } from '@reduxjs/toolkit/query/react';
import { Option, YesOrNo } from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const optionApi = createApi({
  reducerPath: 'option',
  tagTypes: [
    'LapTime',
    'CompanyImage',
    'MapImage',
    'PuzzleMessage',
    'LastPuzzleVideoUrl',
    'CanOpenLastPuzzle',
    'CanSubmitDescryptedSentence',
    'AdminPassword',
  ],
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
    getOriginalPuzzleMessage: build.query<Option<string>, void>({
      query: () => ({ url: 'original-puzzle-message' }),
      providesTags: ['PuzzleMessage'],
    }),
    updatePuzzleMessage: build.mutation<Option<string>, { message: string }>({
      query: (body) => ({
        url: 'puzzle-message',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PuzzleMessage'],
    }),
    getLastPuzzleVideoUrl: build.query<Option<string>, void>({
      query: () => ({ url: 'last-puzzle-video-url' }),
      providesTags: ['LastPuzzleVideoUrl'],
    }),
    updateLastPuzzleVideoUrl: build.mutation<
      Option<string>,
      { videoUrl: string }
    >({
      query: (body) => ({
        url: 'last-puzzle-video-url',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['LastPuzzleVideoUrl'],
    }),
    getCanOpenLastPuzzle: build.query<Option<YesOrNo>, void>({
      query: () => ({ url: 'can-open-last-puzzle' }),
      providesTags: ['CanOpenLastPuzzle'],
    }),
    updateCanOpenLastPuzzle: build.mutation<
      Option<string>,
      { status: YesOrNo }
    >({
      query: (body) => ({
        url: 'can-open-last-puzzle',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CanOpenLastPuzzle'],
    }),
    getCanSubmitDescryptedSentence: build.query<Option<YesOrNo>, void>({
      query: () => ({ url: 'can-submit-descrypted-sentence' }),
      providesTags: ['CanSubmitDescryptedSentence'],
    }),
    updateCanSubmitDescryptedSentence: build.mutation<
      Option<string>,
      { status: YesOrNo }
    >({
      query: (body) => ({
        url: 'can-submit-descrypted-sentence',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CanSubmitDescryptedSentence'],
    }),
    getAdminPassword: build.query<Option<string>, void>({
      query: () => ({ url: 'admin-password' }),
      providesTags: ['AdminPassword'],
    }),
    updateAdminPassword: build.mutation<Option<string>, { password: string }>({
      query: (body) => ({
        url: 'admin-password',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AdminPassword'],
    }),
  }),
});

export default optionApi;
