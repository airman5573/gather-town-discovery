import { Grid, Position } from '../types';

export const zip = (arr1: Array<number>, arr2: Array<number>) => {
  return arr1.map((num, i) => [num, arr2[i]]);
};

export const range = (_from: number, _to: number) => {
  const size = Math.abs(_to - _from) + 1;
  if (_to > _from) {
    return [...Array(size).keys()].map((i) => _from + i);
  }
  return [...Array(size).keys()].map((i) => _from - i);
};

export const repeat3 = (num: number) => new Array(3).fill(num);

export const isInGrid = (grid: Grid, yx: Position) => {
  const [y, x] = yx;
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
};

export const consecutiveCount = (
  grid: Grid,
  positions: Array<Position>,
  team: number,
): number => {
  let count = 0;
  for (const [y, x] of positions) {
    // Grid를 넘어서거나 다른 팀 돌이 나오면 끊어준다
    if (!isInGrid(grid, [y, x]) || grid[y][x] !== team) {
      return count;
    }
    count += 1;
  }
  return count;
};

export const threeInLine = (
  grid: Grid,
  dir1: Array<Position>,
  dir2: Array<Position>,
  team: number,
) => {
  let total = 1; // 자기 자리에 놓으니까 1개는 먹고 들어 가는거다.
  total += consecutiveCount(grid, dir1, team);
  total += consecutiveCount(grid, dir2, team);
  return total === 3;
};

export const consoleGrid = (grid: Grid) => {
  const result = grid.reduce((acc, cur) => {
    acc += `${cur} \n`;
    return acc;
  }, '');
  console.log(result);
};
