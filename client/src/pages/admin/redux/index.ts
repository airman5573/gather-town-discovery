import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import optionApi from './api/option.api';
import teamPasswordApi from './api/team-password.api';
import timerApi from './api/timer.api';
import teamPointApi from './api/team-point.api';
import modalControlReducer from './features/modal-control.slice';
import pointTableApi from './api/point-table.api';
import resetApi from './api/reset.api';
import statisticsApi from './api/statistics.api';
import missionUploadApi from './api/mission-upload';

export const store = configureStore({
  reducer: {
    modalControl: modalControlReducer,
    [teamPasswordApi.reducerPath]: teamPasswordApi.reducer,
    [timerApi.reducerPath]: timerApi.reducer,
    [optionApi.reducerPath]: optionApi.reducer,
    [teamPointApi.reducerPath]: teamPointApi.reducer,
    [pointTableApi.reducerPath]: pointTableApi.reducer,
    [resetApi.reducerPath]: resetApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [missionUploadApi.reducerPath]: missionUploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    return [
      ...middlewares,
      teamPasswordApi.middleware,
      timerApi.middleware,
      optionApi.middleware,
      teamPointApi.middleware,
      pointTableApi.middleware,
      resetApi.middleware,
      statisticsApi.middleware,
      missionUploadApi.middleware,
    ];
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
