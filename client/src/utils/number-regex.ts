export default function isNumber(value: number) {
  const reg = new RegExp('^[0-9]+$');
  return `${value}`.match(reg);
}
