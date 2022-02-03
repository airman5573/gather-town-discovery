export default function secondsToMinutes(seconds: number) {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.floor(Math.abs(seconds) % 60);
  return seconds >= 0 ? `${m}분 ${s}초` : `-${m}분 ${s}초`;
}
