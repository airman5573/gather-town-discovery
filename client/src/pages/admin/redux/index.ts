import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import teamPasswordsApi from './api/team-passwords.api';
import modalControlReducer from './features/modal-control.slice';
import teamPasswordsReducer from './features/team-passwords.slice';

export const store = configureStore({
  reducer: {
    modalControl: modalControlReducer,
    teamPasswords: teamPasswordsReducer,
    [teamPasswordsApi.reducerPath]: teamPasswordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teamPasswordsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
