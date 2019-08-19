// @flow

export type ButtonPlacement = 'right' | 'leftAndRight';
export type ValueType = 'integer' | 'decimal';
export type ButtonType = 'increment' | 'decrement';

export type Props = {
  value: string,
  onChange: (newValue: string) => void,
  allowEmptyValue: boolean,
  buttonPlacement: ButtonPlacement,
  className: string,
  defaultValue: number,
  id: string,
  minValue: number,
  maxValue: number,
  maxLength: number,
  placeholder: string,
  precision: number,
  showError: boolean,
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
  stepAmount: number,
  valueType: ValueType
};
