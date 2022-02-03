import classNames from 'classnames';
import { InputGroup } from 'react-bootstrap';
import { YesOrNo } from '../../../types';
import toasty from '../../../utils/toasty';
import timerApi from '../redux/api/timer.api';
import RemainTime from './RemainTime';

type TProps = {
  team: number;
  startTime: string;
  lapTime: number;
  isRunning: YesOrNo;
};

export default function TimerBtn({
  team,
  startTime,
  lapTime,
  isRunning,
}: TProps) {
  const [stopTimer] = timerApi.useStopMutation();
  const cn = classNames('btn', 'flex-grow-1', {
    'btn-basic': isRunning === YesOrNo.NO ? true : false,
    'btn-danger': isRunning === YesOrNo.YES ? true : false,
  });
  const handleStopTimerBtnClick = async () => {
    try {
      await stopTimer(team);
      toasty.success(`${team}팀의 타이머를 중지합니다`);
    } catch (e: any) {
      console.log('e :', e);
    }
  };
  return (
    <>
      <InputGroup>
        <InputGroup.Text>{team}</InputGroup.Text>
        <button className={cn} type="button" onClick={handleStopTimerBtnClick}>
          {isRunning === YesOrNo.YES ? '종료' : '준비중'}
        </button>
      </InputGroup>
      {isRunning === YesOrNo.YES && (
        <RemainTime startTime={startTime} lapTime={lapTime}></RemainTime>
      )}
    </>
  );
}
