import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { YesOrNo } from '../../../../common/types';
import secondsToMinutes from '../../../../utils/seconds-to-minutes';
import { getRemainTimeInSecond } from '../../../../utils/timer';

type TProps = {
  team: number;
  isRunning: YesOrNo;
  startTime: string;
  lapTime: number;
};

export default function Timer({ isRunning, startTime, lapTime }: TProps) {
  const [remainTime, setRemainTime] = useState<number>(
    getRemainTimeInSecond(startTime, lapTime),
  );

  useEffect(() => {
    setRemainTime(getRemainTimeInSecond(startTime, lapTime));
    const timer = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
    if (isRunning === YesOrNo.NO) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [lapTime, startTime, isRunning]);
  const cn = classNames('timer', 'text-center', {
    red: remainTime <= 0 ? true : false,
  });
  return <h3 className={cn}>{secondsToMinutes(remainTime)}</h3>;
}
