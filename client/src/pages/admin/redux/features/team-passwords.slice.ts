import { createSlice } from '@reduxjs/toolkit';
import { MAX_TEAM } from '../../../../constants';
import { TeamPassword } from '../../../../types';

type InitialState = {
  teamPasswords: Array<TeamPassword>;
};

const initialState: InitialState = {
  teamPasswords: Array(MAX_TEAM)
    .fill(0)
    .map((v, i) => {
      return { team: i + 1, password: '' };
    }),
};

const teamPasswordsSlice = createSlice({
  name: 'team-passwords',
  initialState,
  reducers: {},
});

export default teamPasswordsSlice.reducer;
