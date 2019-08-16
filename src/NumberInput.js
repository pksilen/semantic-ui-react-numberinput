// @flow

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

type ButtonPlacement = 'right' | 'leftAndRight';
type ValueType = 'integer' | 'decimal';
type ButtonType = 'increment' | 'decrement';

type Props = {
  value: string,
  onChange: (newValue: string) => void,
  buttonPlacement: ButtonPlacement,
  className: string,
  id: string,
  minValue: number,
  maxValue: number,
  maxLength: number,
  precision: number,
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
  stepAmount: number,
  valueType: ValueType
};

const style = {
  outerDivStyle: {
    display: 'flex'
  },
  buttonGroupDivStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  leftAndRightButtonStyle: {
    borderRadius: 0,
    lineHeight: 'calc(1em + 2px)',
    margin: 0
  },
  rightButtonStyle: {
    borderRadius: 0,
    flex: '0 0 50%',
    minHeight: 'unset',
    margin: 0,
    maxHeight: 'unset',
    padding: '0 0.2em'
  },
  inputStyle: {
    borderRadius: 0,
    textAlign: 'right'
  }
};

// noinspection JSUnusedGlobalSymbols
export default class NumberInput extends React.Component<Props, {}> {
  static validateValue = (props: Props): ?Error => {
    if (!props.value) {
      return new Error('value is required');
    }
    if (props.valueType === 'integer' && !Number.isSafeInteger(parseInt(props.value, 10))) {
      return new Error('value must be a string that can be parsed to an integer');
    }
    if (props.valueType === 'decimal' && !Number.isFinite(parseFloat(props.value))) {
      return new Error('value must be a string that can be parsed to a decimal number');
    }
    return null;
  };

  static validateIntegerOrDecimalValue = (
    valueType: ValueType,
    value: number,
    valueName: string,
    maxLength: number
  ): ?Error => {
    if (valueType === 'integer' && !Number.isSafeInteger(value)) {
      return new Error(`${valueName} must be an integer`);
    }
    if (valueType === 'decimal' && !Number.isFinite(value)) {
      return new Error(`${valueName} must be a decimal number`);
    }
    if (value.toString().length > maxLength) {
      return new Error(`${valueName} does not fit in maxLength`);
    }
    return null;
  };

  static validateMinValue = (props: Props): ?Error => {
    if (props.minValue > props.maxValue) {
      return new Error('maxValue must greater than or equal to minValue');
    }
    return NumberInput.validateIntegerOrDecimalValue(
      props.valueType,
      props.minValue,
      'minValue',
      props.maxLength
    );
  };

  static validateMaxValue = (props: Props): ?Error =>
    NumberInput.validateIntegerOrDecimalValue(props.valueType, props.maxValue, 'maxValue', props.maxLength);

  static validateMaxLength = (props: Props): ?Error => {
    if (!Number.isSafeInteger(props.maxLength) || props.maxLength < 1) {
      return new Error('maxLength must be a positive integer');
    }
    return null;
  };

  static validatePrecision = (props: Props): ?Error => {
    if (!Number.isSafeInteger(props.precision) || props.precision < 1) {
      return new Error('precision must be a positive integer');
    }
    return null;
  };

  static validateStepCount = (props: Props): ?Error => {
    if (props.valueType === 'integer' && (!Number.isSafeInteger(props.stepAmount) || props.stepAmount <= 0)) {
      return new Error('stepAmount must be a positive integer');
    }
    if (props.valueType === 'decimal' && (!Number.isFinite(props.stepAmount) || props.stepAmount <= 0)) {
      return new Error('stepAmount must be a postive decimal value');
    }
    return null;
  };

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    value: NumberInput.validateValue,
    onChange: PropTypes.func.isRequired,
    buttonPlacement: PropTypes.oneOf(['right', 'leftAndRight']),
    className: PropTypes.string,
    id: PropTypes.string,
    minValue: NumberInput.validateMinValue,
    maxValue: NumberInput.validateMaxValue,
    maxLength: NumberInput.validateMaxLength,
    precision: NumberInput.validatePrecision,
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    stepAmount: NumberInput.validateStepCount,
    valueType: PropTypes.oneOf(['integer', 'decimal'])
  };

  // noinspection MagicNumberJS
  static defaultProps = {
    buttonPlacement: 'leftAndRight',
    className: null,
    id: null,
    minValue: -999999999,
    maxValue: 9999999999,
    maxLength: 10,
    precision: 2,
    size: 'small',
    stepAmount: 1,
    valueType: 'integer'
  };

  decrementValue = () => {
    const { minValue, onChange, stepAmount, value, valueType } = this.props;
    const currentValue = valueType === 'integer' ? parseInt(value, 10) : parseFloat(value);

    if (this.isValidValue(currentValue, valueType)) {
      const newValue = currentValue - stepAmount;
      if (newValue >= minValue) {
        onChange(this.getValueWithPrecision(newValue).toString());
      }
    }
  };

  isValidValue = (value: number, valueType: ValueType) =>
    (valueType === 'integer' && Number.isSafeInteger(value)) ||
    (valueType === 'decimal' && Number.isFinite(value));

  getValueWithPrecision = (value: number): number => {
    const { precision, valueType } = this.props;

    const factor = 10 ** precision;
    return valueType === 'integer' ? value : Math.round(value * factor) / factor;
  };

  incrementValue = () => {
    const { maxValue, onChange, stepAmount, value, valueType } = this.props;
    const currentValue = valueType === 'integer' ? parseInt(value, 10) : parseFloat(value);

    if (this.isValidValue(currentValue, valueType)) {
      const newValue = currentValue + stepAmount;
      if (newValue <= maxValue) {
        onChange(this.getValueWithPrecision(newValue).toString());
      }
    }
  };

  changeValue = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => {
    const { maxValue, minValue, onChange, valueType } = this.props;
    const newValue = valueType === 'integer' ? parseInt(value, 10) : parseFloat(value);

    if (this.isValidValue(newValue, valueType)) {
      if (newValue >= minValue && newValue <= maxValue) {
        onChange(this.getValueWithPrecision(newValue).toString());
      }
    }
  };

  getInputComponent = (): Element<*> => {
    const { maxLength, size, value } = this.props;

    return (
      <div className={`ui input ${size}`}>
        <input
          type="text"
          style={style.inputStyle}
          maxLength={maxLength}
          value={value}
          onChange={this.changeValue}
        />
      </div>
    );
  };

  getButtonComponent = (buttonType: ButtonType): Element<*> => {
    const { buttonPlacement, size } = this.props;

    return (
      <Button
        size={size}
        style={buttonPlacement === 'right' ? style.rightButtonStyle : style.leftAndRightButtonStyle}
        icon={this.getButtonIconName(buttonType, buttonPlacement)}
        onClick={buttonType === 'increment' ? this.incrementValue : this.decrementValue}
        disabled={this.isDisabledButton(buttonType)}
      />
    );
  };

  getButtonIconName = (buttonType: ButtonType, buttonPlacement: ButtonPlacement): string => {
    if (buttonPlacement === 'right') {
      if (buttonType === 'increment') {
        return 'caret up';
      }
      return 'caret down';
    }

    if (buttonType === 'increment') {
      return 'plus';
    }
    return 'minus';
  };

  isDisabledButton = (buttonType: ButtonType): boolean => {
    const { maxLength, maxValue, minValue, stepAmount, value } = this.props;
    const valueAsInteger = parseInt(value, 10);
    const valueIsNotANumber = Number.isNaN(valueAsInteger);
    const nextIncrementedValue = valueAsInteger + stepAmount;

    if (buttonType === 'increment') {
      return (
        valueIsNotANumber ||
        nextIncrementedValue >= maxValue ||
        nextIncrementedValue.toString().length > maxLength
      );
    }
    return valueIsNotANumber || valueAsInteger - stepAmount <= minValue;
  };

  render(): Element<*> {
    const { buttonPlacement, className, id } = this.props;

    if (buttonPlacement === 'leftAndRight') {
      return (
        <div id={id} className={className}>
          {this.getButtonComponent('decrement')}
          {this.getInputComponent()}
          {this.getButtonComponent('increment')}
        </div>
      );
    }

    return (
      <div id={id} className={className} style={style.outerDivStyle}>
        {this.getInputComponent()}
        <div style={style.buttonGroupDivStyle}>
          {this.getButtonComponent('increment')}
          {this.getButtonComponent('decrement')}
        </div>
      </div>
    );
  }
}
