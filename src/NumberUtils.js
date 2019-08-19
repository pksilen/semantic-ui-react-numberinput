// @flow

// $FlowFixMe
import type { ValueType } from './Types';

export default class NumberUtils {
  static getParsedValue(value: string, valueType: ValueType): number {
    return valueType === 'integer' ? parseInt(value, 10) : parseFloat(value);
  }

  static getValueWithPrecisionAsString(value: number, valueType: ValueType, precision: number): string {
    const factor = 10 ** precision;
    return valueType === 'integer' ? value.toString() : (Math.round(value * factor) / factor).toString();
  }
}
