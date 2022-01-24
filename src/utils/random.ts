export function randomIndexFromArr(arr: number[]): number {
  return arr[(arr.length * Math.random()) | 0];
}

export function randomIndexesFromRange(size: number): number[] {
  const randomIndexes: number[] = [];
  let arr = [...Array(size).keys()];
  while (arr.length > 0) {
    const randomValue = randomIndexFromArr(arr);
    randomIndexes.push(randomValue);
    arr = arr.filter((v) => v !== randomValue);
  }
  return randomIndexes;
}

export function shuffle(arr: string[]) {
  const randomIndexes = randomIndexesFromRange(arr.length);
  return randomIndexes.map((v) => arr[v]);
}
