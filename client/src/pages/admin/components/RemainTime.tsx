import { ChronoUnit, LocalDateTime } from '@js-joda/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import secondsToMinutes from '../../../utils/seconds-to-minutes';

type TProps = {
  startTime: string;
  lapTime: number;
};

export default function RemainTime({ startTime, lapTime }: TProps) {
  const getDiff = (startTime: string, lapTime: number) => {
    const startLocalDateTime = LocalDateTime.parse(startTime);
    const endLocalDateTime = startLocalDateTime.plusSeconds(lapTime);
    const now = LocalDateTime.now();
    return now.until(endLocalDateTime, ChronoUnit.SECONDS);
  };

  const [remainTime, setRemainTime] = useState<number>(
    getDiff(startTime, lapTime),
  );

  useEffect(() => {
    setRemainTime(getDiff(startTime, lapTime));
    const timer = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
    return () => {
      console.log('component unmounted');
      clearInterval(timer);
    };
  }, [lapTime, startTime]);
  const cn = classNames('text-center', { red: remainTime <= 0 ? true : false });
  return <div className={cn}>남은 시간 : {secondsToMinutes(remainTime)}</div>;
}
