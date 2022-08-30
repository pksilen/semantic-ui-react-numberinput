// @flow

import type { Element } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { ActiveListener } from 'react-event-injector';
// $FlowFixMe
import _ from 'lodash';
import { Button, Popup } from 'semantic-ui-react';
// $FlowFixMe
import PropValidators from './validators/PropValidators';
// $FlowFixMe
import Validators from './validators/Validators';
// $FlowFixMe
import type { ButtonType } from './types/Types';
// $FlowFixMe
import style from './style';
// $FlowFixMe
import NumberUtils from './utils/NumberUtils';
// $FlowFixMe
import ButtonUtils from './utils/ButtonUtils';
// $FlowFixMe
import type { Props } from './types/Props';

// noinspection JSUnusedGlobalSymbols
export default class NumberInput extends React.Component<Props, {}> {
  static DOUBLE_CLICK_DELAY_IN_MILLIS = 250;

  static TOOLTIP_SHOW_DELAY_IN_MILLIS = 500;

  static TOOLTIP_HIDE_DELAY_IN_MILLIS = 200;

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    allowEmptyValue: PropTypes.bool,
    allowMouseWheel: PropTypes.bool,
    buttonPlacement: PropTypes.oneOf(['right', 'leftAndRight']),
    className: PropTypes.string,
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
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
  static defaultProps = {
    allowEmptyValue: false,
    allowMouseWheel: false,
    buttonPlacement: 'leftAndRight',
    className: undefined,
    defaultValue: undefined,
    disabled: false,
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

  decrementOrIncrementValue = (
    event: SyntheticMouseEvent<HTMLButtonElement> | null,
    buttonType: ButtonType,
    hasDoubleClicksEnabled: boolean = true
  ) => {
    const { doubleClickStepAmount, stepAmount } = this.props;

    if (event) {
      event.stopPropagation();
    }

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
      onChange(NumberUtils.getValueWithPrecisionAsString(newValue, valueType, precision, value));
    } else if (allowEmptyValue && !value) {
      onChange('');
    }
  };

  onInputBlur = () => {
    const { defaultValue, onChange, precision, value, valueType } = this.props;

    if (defaultValue !== undefined && defaultValue !== null && !value) {
      onChange(NumberUtils.getValueWithPrecisionAsString(defaultValue, valueType, precision));
    }
  };

  onKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    let handled = false;

    switch (event.key) {
      case 'ArrowUp':
      case '+':
        if (event.ctrlKey) {
          _.times(2, () => this.decrementOrIncrementValue(null, 'increment'));
        } else {
          this.decrementOrIncrementValue(null, 'increment', false);
        }
        handled = true;
        break;

      case 'ArrowDown':
      case '-':
        if (event.ctrlKey) {
          _.times(2, () => this.decrementOrIncrementValue(null, 'decrement'));
        } else {
          this.decrementOrIncrementValue(null, 'decrement', false);
        }
        handled = true;
        break;

      case 'PageUp':
        _.times(2, () => this.decrementOrIncrementValue(null, 'increment'));
        handled = true;
        break;

      case 'PageDown':
        _.times(2, () => this.decrementOrIncrementValue(null, 'decrement'));
        handled = true;
        break;

      // no default
    }

    if (handled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  onWheel = (event: SyntheticWheelEvent<HTMLInputElement>) => {
    const { allowMouseWheel } = this.props;

    if (allowMouseWheel) {
      event.preventDefault();
      this.decrementOrIncrementValueByStepAmount('increment', event.deltaY);
    }
  };

  getInputComponent = (): Element<*> => {
    const { buttonPlacement, disabled, maxLength, placeholder, showError, size, value } = this.props;
    const inputStyle = {
      ...style.common.input,
      ...style[buttonPlacement].input
    };

    return (
      <div className={`ui input ${size}${showError ? ' error' : ''}${disabled ? ' disabled' : ''}`}>
        <ActiveListener onWheel={this.onWheel}>
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
        </ActiveListener>
      </div>
    );
  };

  getButtonComponent = (buttonType: ButtonType): Element<*> => {
    const { buttonPlacement, doubleClickStepAmount, disabled, showTooltips, size } = this.props;
    const buttonStyle = {
      ...style[buttonPlacement].button.base,
      ...style[buttonPlacement].button[buttonType]
    };

    const buttonComponent = (
      <Button
        size={size}
        style={buttonStyle}
        type="button"
        icon={ButtonUtils.getButtonIconName(buttonType, buttonPlacement)}
        onClick={(event: SyntheticMouseEvent<HTMLButtonElement>) =>
          this.decrementOrIncrementValue(event, buttonType)
        }
        disabled={disabled || ButtonUtils.isDisabledButton(buttonType, this.props)}
      />
    );

    if (showTooltips && doubleClickStepAmount > 0) {
      const tooltipText = `Double-click to ${buttonType} by ${doubleClickStepAmount}`;
      return (
        <Popup
          content={tooltipText}
          mouseEnterDelay={NumberInput.TOOLTIP_SHOW_DELAY_IN_MILLIS}
          mouseLeaveDelay={NumberInput.TOOLTIP_HIDE_DELAY_IN_MILLIS}
          on="hover"
          trigger={buttonComponent}
        />
      );
    }

    return buttonComponent;
  };

  render(): Element<*> {
    PropValidators.validatePropsInDevelopmentMode(this.props);
    const { buttonPlacement, className, id } = this.props;

    if (buttonPlacement === 'leftAndRight') {
      return (
        <div id={id} className={className}>
          <div style={style.leftAndRight.outerDiv}>
            {this.getButtonComponent('decrement')}
            {this.getInputComponent()}
            {this.getButtonComponent('increment')}
          </div>
        </div>
      );
    }

    return (
      <div id={id} className={className}>
        <div style={style.right.outerDiv}>
          {this.getInputComponent()}
          <div style={style.right.button.div}>
            {this.getButtonComponent('increment')}
            {this.getButtonComponent('decrement')}
          </div>
        </div>
      </div>
    );
  }
}
