// @flow

// $FlowFixMe
import type { Props, ValueType } from './Types';
// $FlowFixMe
import Validators from './Validators';
// $FlowFixMe
import NumberUtils from './NumberUtils';

export default class PropValidators {
  static validateValue(props: Props): ?Error {
    if (!props.allowEmptyValue && !props.value) {
      return new Error('value is required');
    }
    if (props.allowEmptyValue && !props.value) {
      return null;
    }
    const value = NumberUtils.getParsedValue(props.value, props.valueType);
    if (!Validators.isValidValue(value, props.valueType)) {
      return new Error(
        'value must be a string that can be parsed to integer/decimal number depending on valueType'
      );
    }
    return null;
  }

  static validateDefaultValue(props: Props): ?Error {
    if (props.defaultValue !== undefined && !Validators.isValidValue(props.defaultValue, props.valueType)) {
      return new Error('defaultValue must be integer/decimal number depending on valueType');
    }
    return null;
  }

  static validateMinValue(props: Props): ?Error {
    if (props.minValue > props.maxValue) {
      return new Error('maxValue must greater than or equal to minValue');
    }
    return PropValidators.validateMinOrMaxValue(props.valueType, props.minValue, 'minValue', props.maxLength);
  }

  static validateMaxValue = (props: Props): ?Error =>
    PropValidators.validateMinOrMaxValue(props.valueType, props.maxValue, 'maxValue', props.maxLength);

  static validateMinOrMaxValue(
    valueType: ValueType,
    value: number,
    valueName: string,
    maxLength: number
  ): ?Error {
    if (!Validators.isValidValue(value, valueType)) {
      return new Error(`${valueName} must be integer/decimal number depending on valueType`);
    }
    if (value.toString().length > maxLength) {
      return new Error(`${valueName} does not fit in maxLength`);
    }
    return null;
  }

  static validateMaxLength(props: Props): ?Error {
    return Validators.validatePositiveInteger(props.maxLength, 'maxLength');
  }

  static validatePrecision(props: Props): ?Error {
    return Validators.validatePositiveInteger(props.precision, 'precision');
  }

  static validateStepAmount(props: Props): ?Error {
    if (!Validators.isValidValue(props.stepAmount, props.valueType) || props.stepAmount <= 0) {
      return new Error('stepAmount must be a positive integer/decimal number depending on valueType');
    }
    return null;
  }
}
