import { ValueTransformer } from 'typeorm';

export class ArrayStringToNumTransformer implements ValueTransformer {
  to(entityValue: number[]): number[] {
    return entityValue;
  }

  from(databaseValue: string[]): number[] {
    return databaseValue.map((el) => parseInt(el, 10));
  }
}
