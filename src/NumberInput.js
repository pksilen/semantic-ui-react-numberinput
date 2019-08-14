// @flow

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

type Props = {
  id: string,
  value: string,
  onChange: (newValue: string) => void,
  className: string,
  minValue: number,
  maxValue: number,
  maxLength: number,
  size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
  stepCount: number
};

const buttonStyle = {
  borderRadius: 0,
  lineHeight: 'calc(1em + 2px)',
  margin: 0
};

const inputStyle = {
  borderRadius: 0,
  textAlign: 'right'
};

// noinspection JSUnusedGlobalSymbols
export default class NumberInput extends React.Component<Props, {}> {
  static propTypes = {
    id: PropTypes.string,
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
    className: PropTypes.string,
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
    id: null,
    className: null,
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

  render(): Element<*> {
    const { className, id, maxLength, maxValue, minValue, size, stepCount, value } = this.props;
    const valueAsInteger = parseInt(value, 10);
    const valueIsNotANumber = Number.isNaN(valueAsInteger);

    return (
      <div id={id} className={className}>
        <Button
          size={size}
          style={buttonStyle}
          icon="minus"
          onClick={this.decrementValue}
          disabled={valueIsNotANumber || valueAsInteger - stepCount <= minValue}
        />
        <div className={`ui input ${size}`}>
          <input
            type="text"
            style={inputStyle}
            maxLength={maxLength}
            value={value}
            onChange={this.changeValue}
          />
        </div>
        <Button
          size={size}
          style={buttonStyle}
          icon="plus"
          onClick={this.incrementValue}
          disabled={
            valueIsNotANumber ||
            valueAsInteger + stepCount >= maxValue ||
            (valueAsInteger + stepCount).toString().length > maxLength
          }
        />
      </div>
    );
  }
}
