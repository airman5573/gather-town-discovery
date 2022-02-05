import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavMenuItemEnum } from '../../../../common/types';

type InitialState = {
  activeNavMenuItem: NavMenuItemEnum | null;
};

const initialState: InitialState = {
  activeNavMenuItem: null,
};

const modalControlSlice = createSlice({
  name: 'modal-control',
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

export const { updateActiveNavMenuItem } = modalControlSlice.actions;
export default modalControlSlice.reducer;
