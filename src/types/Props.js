// @flow

// $FlowFixMe
import type { ButtonPlacement, ValueType } from './Types';

export type MandatoryProps = {
  value: string,
  onChange: (newValue: string) => void
};

export type OptionalProps = {
  allowEmptyValue: boolean,
  buttonPlacement: ButtonPlacement,
  className: ?string,
  defaultValue: ?number,
  disabled: boolean,
  doubleClickStepAmount: number,
  id: ?string,
  minValue: number,
  maxValue: number,
  maxLength: number,
  placeholder: string,
  precision: number,
  showError: boolean,
  showTooltips: boolean,
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
  stepAmount: number,
  valueType: ValueType
};

export type Props = MandatoryProps | OptionalProps;
