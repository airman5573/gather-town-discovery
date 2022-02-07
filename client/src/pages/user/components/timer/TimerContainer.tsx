/** @jsxImportSource @emotion/react */
import { skipToken } from '@reduxjs/toolkit/dist/query';
import useAuth from '../../../../auth/auth.hooks';
import optionApi from '../../../admin/redux/api/option.api';
import timerApi from '../../../admin/redux/api/timer.api';
import { timerContainerStyle } from './style';
import Timer from './Timer';

export default function TimerContainer() {
  const { user } = useAuth();
  const team = user?.team;
  const { data: timerData } = timerApi.useGetQuery(team ? team : skipToken, {
    // 3초마다 타이머 상태를 확인한다. 관리자가 타이머를 종료할수도 있으니, 실시간으로 반영해야 하기 때문이다.
    pollingInterval: 1500,
  });
  const lapTimeObj = optionApi.useGetLapTimeQuery();
  const isRunning = timerData?.isRunning;
  const startTime = timerData?.startTime;
  const lapTime = lapTimeObj.data?.optionValue;
  const isReady = team && isRunning && startTime && lapTime;
  return (
    <div className="timer-container" css={timerContainerStyle}>
      {isReady && (
        <Timer
          team={team}
          isRunning={isRunning}
          startTime={startTime}
          lapTime={lapTime}
        />
      )}
    </div>
  );
}
