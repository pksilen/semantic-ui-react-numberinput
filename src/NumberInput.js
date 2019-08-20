// @flow

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
// $FlowFixMe
import PropValidators from './validators/PropValidators';
// $FlowFixMe
import Validators from './validators/Validators';
// $FlowFixMe
import type { ButtonType, Props } from './types/Types';
// $FlowFixMe
import style from './style';
// $FlowFixMe
import NumberUtils from './utils/NumberUtils';
// $FlowFixMe
import ButtonUtils from './utils/ButtonUtils';

// noinspection JSUnusedGlobalSymbols
export default class NumberInput extends React.Component<Props, {}> {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    allowEmptyValue: PropTypes.bool,
    buttonPlacement: PropTypes.oneOf(['right', 'leftAndRight']),
    className: PropTypes.string,
    defaultValue: PropTypes.number,
    id: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    precision: PropTypes.number,
    showError: PropTypes.bool,
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    stepAmount: PropTypes.number,
    valueType: PropTypes.oneOf(['integer', 'decimal'])
  };

  // noinspection MagicNumberJS
  static defaultProps = {
    allowEmptyValue: false,
    buttonPlacement: 'leftAndRight',
    className: undefined,
    defaultValue: undefined,
    id: undefined,
    minValue: 0,
    maxValue: 9999999999,
    maxLength: 10,
    placeholder: 'Enter a value',
    precision: 2,
    showError: false,
    size: 'small',
    stepAmount: 1,
    valueType: 'integer'
  };

  decrementValue = () => {
    const { minValue, onChange, precision, stepAmount, value, valueType } = this.props;
    const currentValue = NumberUtils.getParsedValue(value, valueType);

    if (Validators.isValidValue(currentValue, valueType)) {
      const newValue = currentValue - stepAmount;
      if (newValue >= minValue) {
        onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision));
      }
    }
  };

  incrementValue = () => {
    const { maxValue, onChange, precision, stepAmount, value, valueType } = this.props;
    const currentValue = NumberUtils.getParsedValue(value, valueType);

    if (Validators.isValidValue(currentValue, valueType)) {
      const newValue = currentValue + stepAmount;
      if (newValue <= maxValue) {
        onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision));
      }
    }
  };

  changeValue = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => {
    const { allowEmptyValue, maxValue, minValue, onChange, precision, valueType } = this.props;
    const newValue = NumberUtils.getParsedValue(value, valueType);

    if (Validators.isValidValue(newValue, valueType)) {
      if (newValue >= minValue && newValue <= maxValue) {
        onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision));
      }
    } else if (allowEmptyValue && !value) {
      onChange('');
    }
  };

  onInputBlur = () => {
    const { defaultValue, onChange, precision, value, valueType } = this.props;

    if (defaultValue !== undefined && !value) {
      onChange(NumberUtils.getValueWithPrecisionAsString(defaultValue, valueType, precision));
    }
  };

  getInputComponent = (): Element<*> => {
    const { buttonPlacement, maxLength, placeholder, showError, size, value } = this.props;
    const inputStyle = {
      ...style.common.input,
      ...style[buttonPlacement].input
    };

    return (
      <div className={`ui input ${size}${showError ? ' error' : ''}`}>
        <input
          type="text"
          style={inputStyle}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={this.changeValue}
          onBlur={this.onInputBlur}
        />
      </div>
    );
  };

  getButtonComponent = (buttonType: ButtonType): Element<*> => {
    const { buttonPlacement, size } = this.props;
    const buttonStyle = {
      ...style[buttonPlacement].button.base,
      ...style[buttonPlacement].button[buttonType]
    };

    return (
      <Button
        size={size}
        style={buttonStyle}
        icon={ButtonUtils.getButtonIconName(buttonType, buttonPlacement)}
        onClick={buttonType === 'increment' ? this.incrementValue : this.decrementValue}
        disabled={ButtonUtils.isDisabledButton(buttonType, this.props)}
      />
    );
  };

  render(): Element<*> {
    PropValidators.validatePropsInDevelopmentMode(this.props);
    const { buttonPlacement, className, id } = this.props;

    if (buttonPlacement === 'leftAndRight') {
      return (
        <div id={id} className={className} style={style.leftAndRight.outerDiv}>
          {this.getButtonComponent('decrement')}
          {this.getInputComponent()}
          {this.getButtonComponent('increment')}
        </div>
      );
    }

    return (
      <div id={id} className={className} style={style.right.outerDiv}>
        {this.getInputComponent()}
        <div style={style.right.button.div}>
          {this.getButtonComponent('increment')}
          {this.getButtonComponent('decrement')}
        </div>
      </div>
    );
  }
}
