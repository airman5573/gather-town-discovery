import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginInfo } from '../../../../common/types';

type InitialState = {
  team?: number;
  token?: string;
};

const initialState: InitialState = {};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginInfo>) {
      state.team = action.payload.team;
      state.token = action.payload.token;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
