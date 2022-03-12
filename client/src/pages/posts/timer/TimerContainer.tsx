/** @jsxImportSource @emotion/react */
import { YesOrNo } from '../../../common/types';
import optionApi from '../../admin/redux/api/option.api';
import timerApi from '../../admin/redux/api/timer.api';
import { timerContainerStyle } from './style';
import Timer from './Timer';

type TProps = {
  team: number;
};

export default function TimerContainer({ team }: TProps) {
  const { data: timerData } = timerApi.useGetQuery(team, {
    // 3초마다 타이머 상태를 확인한다. 관리자가 타이머를 종료할수도 있으니, 실시간으로 반영해야 하기 때문이다.
    pollingInterval: 3000,
  });
  const lapTimeObj = optionApi.useGetLapTimeQuery();
  const isRunning = timerData?.isRunning;
  const startTime = timerData?.startTime;
  const lapTime = lapTimeObj.data?.optionValue ?? 0;
  const isReady = !!(isRunning === YesOrNo.YES && startTime && lapTime > 0);

  return (
    <div className="timer-container" css={timerContainerStyle}>
      {isReady ? (
        <Timer
          team={team}
          isRunning={isRunning}
          startTime={startTime}
          lapTime={lapTime}
        />
      ) : (
        <h4>타이머 OFF</h4>
      )}
    </div>
  );
}
