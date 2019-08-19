// @flow

// $FlowFixMe
import type { ValueType } from './Types';

export default class Validators {
  static isValidValue = (value: number, valueType: ValueType) =>
    (valueType === 'integer' && Number.isSafeInteger(value)) ||
    (valueType === 'decimal' && Number.isFinite(value));

  static validatePositiveInteger(value: number, valueName: string): ?Error {
    if (!Number.isSafeInteger(value) || value < 1) {
      return new Error(`${valueName} must be a positive integer`);
    }
    return null;
  }
}
