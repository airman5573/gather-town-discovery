import { LocalDateTime } from '@js-joda/core';
import { createSlice } from '@reduxjs/toolkit';
import { MAX_TEAM } from '../../../../constants';
import { Timer, YesOrNo } from '../../../../types';

type InitialState = {
  timers: Array<Timer>;
};

const initialState: InitialState = {
  timers: Array(MAX_TEAM)
    .fill(0)
    .map((v, i) => {
      return {
        team: i + 1,
        startTime: LocalDateTime.now().toString(),
        isRunning: YesOrNo.NO,
      };
    }),
};

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {},
});

export default timersSlice.reducer;
