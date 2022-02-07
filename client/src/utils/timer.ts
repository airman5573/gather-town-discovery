import { ChronoUnit, LocalDateTime } from '@js-joda/core';

export const getRemainTimeInSecond = (startTime: string, lapTime: number) => {
  const startLocalDateTime = LocalDateTime.parse(startTime);
  const endLocalDateTime = startLocalDateTime.plusSeconds(lapTime);
  const now = LocalDateTime.now();
  return now.until(endLocalDateTime, ChronoUnit.SECONDS);
};
