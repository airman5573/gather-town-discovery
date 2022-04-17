import { createApi } from '@reduxjs/toolkit/query/react';
import {
  OpenPuzzleDto,
  PuzzleEntity,
  DescryptSentenceDto,
} from '../../../../common/types';
import baseQueryWithAuth from './baseQueryWithAuth';

const puzzleApi = createApi({
  reducerPath: 'puzzle',
  tagTypes: ['Puzzles'],
  baseQuery: baseQueryWithAuth({
    baseUrl: 'puzzle',
  }),
  endpoints: (build) => ({
    getAll: build.query<Array<PuzzleEntity>, void>({
      query: () => ({ url: 'all' }),
      providesTags: ['Puzzles'],
    }),
    open: build.mutation<
      { isLetterBox: boolean; bingoCount: number },
      OpenPuzzleDto
    >({
      query: ({ team, boxKey }) => ({
        url: 'open',
        method: 'PUT',
        body: {
          team,
          boxKey,
        },
      }),
      invalidatesTags: ['Puzzles'],
    }),
    submit: build.mutation<{ rank: number }, DescryptSentenceDto>({
      query: ({ team, sentence }) => ({
        url: 'descrypt-sentence',
        method: 'POST',
        body: {
          team,
          sentence,
        },
      }),
    }),
  }),
});

export default puzzleApi;
