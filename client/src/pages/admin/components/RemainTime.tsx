import classNames from 'classnames';
import { useEffect, useState } from 'react';
import secondsToMinutes from '../../../utils/seconds-to-minutes';
import { getRemainTimeInSecond } from '../../../utils/timer';

type TProps = {
  startTime: string;
  lapTime: number;
};

export default function RemainTime({ startTime, lapTime }: TProps) {
  const [remainTime, setRemainTime] = useState<number>(
    getRemainTimeInSecond(startTime, lapTime),
  );

  useEffect(() => {
    setRemainTime(getRemainTimeInSecond(startTime, lapTime));
    const timer = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [lapTime, startTime]);
  const cn = classNames('text-center', { red: remainTime <= 0 ? true : false });
  return <div className={cn}>남은 시간 : {secondsToMinutes(remainTime)}</div>;
}
