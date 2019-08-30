// @flow

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';
// $FlowFixMe
import _ from 'lodash';
import { Button, Popup } from 'semantic-ui-react';
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
// $FlowFixMe
import type { OptionalProps } from './types/Props';

// noinspection JSUnusedGlobalSymbols
export default class NumberInput extends React.Component<Props, {}> {
  static DOUBLE_CLICK_DELAY_IN_MILLIS = 250;

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    allowEmptyValue: PropTypes.bool,
    buttonPlacement: PropTypes.oneOf(['right', 'leftAndRight']),
    className: PropTypes.string,
    defaultValue: PropTypes.number,
    doubleClickStepAmount: PropTypes.number,
    id: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    precision: PropTypes.number,
    showError: PropTypes.bool,
    showTooltips: PropTypes.bool,
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
    stepAmount: PropTypes.number,
    valueType: PropTypes.oneOf(['integer', 'decimal'])
  };

  // noinspection MagicNumberJS
  static defaultProps: OptionalProps = {
    allowEmptyValue: false,
    buttonPlacement: 'leftAndRight',
    className: undefined,
    defaultValue: undefined,
    doubleClickStepAmount: 0,
    id: undefined,
    minValue: 0,
    maxValue: 9999999999,
    maxLength: 10,
    placeholder: 'Enter a value',
    precision: 2,
    showError: false,
    showTooltips: true,
    size: 'small',
    stepAmount: 1,
    valueType: 'integer'
  };

  timeoutIDMap = {
    increment: 0,
    decrement: 0
  };

  decrementOrIncrementValue = (buttonType: ButtonType, hasDoubleClicksEnabled: boolean = true) => {
    const { doubleClickStepAmount, stepAmount } = this.props;

    if (this.timeoutIDMap[buttonType]) {
      window.clearTimeout(this.timeoutIDMap[buttonType]);
      this.decrementOrIncrementValueByStepAmount(buttonType, doubleClickStepAmount);
    } else if (hasDoubleClicksEnabled && doubleClickStepAmount > 0) {
      this.timeoutIDMap[buttonType] = window.setTimeout(() => {
        this.decrementOrIncrementValueByStepAmount(buttonType, stepAmount);
      }, NumberInput.DOUBLE_CLICK_DELAY_IN_MILLIS);
    } else {
      this.decrementOrIncrementValueByStepAmount(buttonType, stepAmount);
    }
  };

  decrementOrIncrementValueByStepAmount = (buttonType: ButtonType, stepAmount: number) => {
    const { maxValue, minValue, onChange, precision, value, valueType } = this.props;
    const currentValue = NumberUtils.getParsedValue(value, valueType);
    let newValue = buttonType === 'decrement' ? currentValue - stepAmount : currentValue + stepAmount;
    if (newValue < minValue) {
      newValue = minValue;
    } else if (newValue > maxValue) {
      newValue = maxValue;
    }

    if (Validators.isValidValue(newValue, valueType)) {
      onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision));
    }

    this.timeoutIDMap[buttonType] = 0;
  };

  changeValue = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => {
    const { allowEmptyValue, maxValue, minValue, onChange, precision, valueType } = this.props;
    const newValue = NumberUtils.getParsedValue(value, valueType);

    if (Validators.isValidValue(newValue, valueType) && newValue >= minValue && newValue <= maxValue) {
      onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision));
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

  onKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    switch (event.key) {
      case 'ArrowUp':
      case '+':
        if (event.ctrlKey) {
          _.times(2, () => this.decrementOrIncrementValue('increment'));
        } else {
          this.decrementOrIncrementValue('increment', false);
        }
        break;

      case 'ArrowDown':
      case '-':
        if (event.ctrlKey) {
          _.times(2, () => this.decrementOrIncrementValue('decrement'));
        } else {
          this.decrementOrIncrementValue('decrement', false);
        }
        break;

      case 'PageUp':
        _.times(2, () => this.decrementOrIncrementValue('increment'));
        break;

      case 'PageDown':
        _.times(2, () => this.decrementOrIncrementValue('decrement'));
        break;

      default:
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
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  };

  getButtonComponent = (buttonType: ButtonType): Element<*> => {
    const { buttonPlacement, doubleClickSteAmount, showTooltips, size } = this.props;
    const buttonStyle = {
      ...style[buttonPlacement].button.base,
      ...style[buttonPlacement].button[buttonType]
    };

    const buttonComponent = (
      <Button
        size={size}
        style={buttonStyle}
        icon={ButtonUtils.getButtonIconName(buttonType, buttonPlacement)}
        onClick={() => this.decrementOrIncrementValue(buttonType)}
        disabled={ButtonUtils.isDisabledButton(buttonType, this.props)}
      />
    );

    if (showTooltips && doubleClickSteAmount > 0) {
      const tooltipText = `Double-click to ${buttonType} by ${doubleClickSteAmount}`;
      return <Popup content={tooltipText} trigger={buttonComponent} />;
    }

    return buttonComponent;
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
