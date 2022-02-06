import { skipToken } from '@reduxjs/toolkit/dist/query';
import useAuth from '../../../../auth/auth.hooks';
import optionApi from '../../../admin/redux/api/option.api';
import timerApi from '../../../admin/redux/api/timer.api';
import Timer from './Timer';

export default function TimerContainer() {
  const { user } = useAuth();
  const team = user?.team;
  const { data: timerData } = timerApi.useGetQuery(team ? team : skipToken);
  const lapTimeObj = optionApi.useGetLapTimeQuery();
  const isRunning = timerData?.isRunning;
  const startTime = timerData?.startTime;
  const lapTime = lapTimeObj.data?.optionValue;
  const isReady = team && isRunning && startTime && lapTime;

  return (
    <>
      {isReady && (
        <Timer
          team={team}
          isRunning={isRunning}
          startTime={startTime}
          lapTime={lapTime}
        />
      )}
    </>
  );
}
