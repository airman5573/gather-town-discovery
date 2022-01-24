import { PointTableKey } from 'src/types';
import { ValueTransformer } from 'typeorm';

export class UnderscoreToCamelCaseTransformer implements ValueTransformer {
  to(entityValue: PointTableKey): PointTableKey {
    return entityValue;
  }

  from(databaseValue: string): string {
    return databaseValue.replace(/_./g, (m) => m[1].toUpperCase());
  }
}
