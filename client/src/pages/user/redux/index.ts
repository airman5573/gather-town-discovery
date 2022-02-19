import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import optionApi from '../../admin/redux/api/option.api';
import puzzleApi from '../../admin/redux/api/puzzle.api';
import teamPointApi from '../../admin/redux/api/team-point.api';
import timerApi from '../../admin/redux/api/timer.api';
import pageControlReducer from './features/page-control.slice';

export const store = configureStore({
  reducer: {
    pageControl: pageControlReducer,
    [teamPointApi.reducerPath]: teamPointApi.reducer,
    [timerApi.reducerPath]: timerApi.reducer,
    [optionApi.reducerPath]: optionApi.reducer,
    [puzzleApi.reducerPath]: puzzleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    return [
      ...middlewares,
      timerApi.middleware,
      optionApi.middleware,
      puzzleApi.middleware,
    ];
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
