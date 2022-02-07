import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavMenuItemEnum } from '../../types';

type InitialState = {
  activeNavMenuItem: NavMenuItemEnum | null;
};

const initialState: InitialState = {
  activeNavMenuItem: null,
};

const pageControlSlice = createSlice({
  name: 'page-control',
  initialState,
  reducers: {
    updateActiveNavMenuItem(
      state,
      action: PayloadAction<NavMenuItemEnum | null>,
    ) {
      state.activeNavMenuItem = action.payload;
    },
  },
});

export const { updateActiveNavMenuItem } = pageControlSlice.actions;
export default pageControlSlice.reducer;
