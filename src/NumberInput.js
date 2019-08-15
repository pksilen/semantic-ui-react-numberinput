// @flow

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

type ButtonPlacement = 'right' | 'leftAndRight';

type Props = {
  value: string,
  onChange: (newValue: string) => void,
  buttonPlacement: ButtonPlacement,
  className: string,
  id: string,
  minValue: number,
  maxValue: number,
  maxLength: number,
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
  stepCount: number
};

type ButtonType = 'increment' | 'decrement';

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
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    value(props: Props): ?Error {
      if (!props.value) {
        return new Error('value is required');
      }
      if (!Number.isSafeInteger(parseInt(props.value, 10))) {
        return new Error('value must be a string that can be parsed to an integer');
      }
      return null;
    },
    onChange: PropTypes.func.isRequired,
    buttonPlacement: PropTypes.oneOf(['right', 'leftAndRight']),
    className: PropTypes.string,
    id: PropTypes.string,
    minValue(props: Props): ?Error {
      if (!Number.isSafeInteger(props.minValue)) {
        return new Error('minValue must be an integer');
      }
      if (props.minValue >= props.maxValue) {
        return new Error('maxValue must greater than minValue');
      }
      return null;
    },
    maxValue(props: Props): ?Error {
      if (!Number.isSafeInteger(props.maxValue)) {
        return new Error('maxValue must be an integer');
      }
      if (props.minValue >= props.maxValue) {
        return new Error('maxValue must greater than minValue');
      }
      return null;
    },
    maxLength(props: Props): ?Error {
      if (!Number.isSafeInteger(props.maxLength) || props.maxLength < 1) {
        return new Error('maxLength must be a positive integer');
      }
      return null;
    },
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    stepCount(props: Props): ?Error {
      if (!Number.isSafeInteger(props.stepCount) || props.stepCount < 1) {
        return new Error('stepCount must be a positive integer');
      }
      return null;
    }
  };

  static defaultProps = {
    buttonPlacement: 'leftAndRight',
    className: null,
    id: null,
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
    maxLength: 10,
    size: 'small',
    stepCount: 1
  };

  decrementValue = () => {
    const { minValue, onChange, stepCount, value } = this.props;
    const valueAsInteger = parseInt(value, 10);

    if (Number.isSafeInteger(valueAsInteger)) {
      const newValueAsInteger = valueAsInteger - stepCount;
      if (newValueAsInteger >= minValue) {
        onChange(newValueAsInteger.toString());
      }
    }
  };

  incrementValue = () => {
    const { maxValue, onChange, stepCount, value } = this.props;
    const valueAsInteger = parseInt(value, 10);

    if (Number.isSafeInteger(valueAsInteger)) {
      const newValueAsInteger = valueAsInteger + stepCount;
      if (newValueAsInteger <= maxValue) {
        onChange(newValueAsInteger.toString());
      }
    }
  };

  changeValue = ({ target: { value: newValue } }: SyntheticInputEvent<HTMLInputElement>) => {
    const { maxValue, minValue, onChange } = this.props;
    const newValueAsInteger = parseInt(newValue, 10);

    if (Number.isSafeInteger(newValueAsInteger)) {
      if (newValueAsInteger >= minValue && newValueAsInteger <= maxValue) {
        onChange(newValueAsInteger.toString());
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
    const { maxLength, maxValue, minValue, stepCount, value } = this.props;
    const valueAsInteger = parseInt(value, 10);
    const valueIsNotANumber = Number.isNaN(valueAsInteger);
    const nextIncrementedValue = valueAsInteger + stepCount;

    if (buttonType === 'increment') {
      return (
        valueIsNotANumber ||
        nextIncrementedValue >= maxValue ||
        nextIncrementedValue.toString().length > maxLength
      );
    }
    return valueIsNotANumber || valueAsInteger - stepCount <= minValue;
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
