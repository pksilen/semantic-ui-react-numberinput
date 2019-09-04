// @flow

// $FlowFixMe
import type { ButtonPlacement, ButtonType, Props } from '../types/Types';
// $FlowFixMe
import Validators from '../validators/Validators';
// $FlowFixMe
import NumberUtils from './NumberUtils';

export default class ButtonUtils {
  static isDisabledButton(
    buttonType: ButtonType,
    { maxValue, minValue, stepAmount, value, valueType }: Props
  ): boolean {
    const currentValue = NumberUtils.getParsedValue(value, valueType);
    const nextIncrementedValue = currentValue + stepAmount;
    const nextDecrementedValue = currentValue - stepAmount;

    if (buttonType === 'increment') {
      return !Validators.isValidValue(currentValue, valueType) || nextIncrementedValue > maxValue;
    }
    return !Validators.isValidValue(currentValue, valueType) || nextDecrementedValue < minValue;
  }

  static getButtonIconName(buttonType: ButtonType, buttonPlacement: ButtonPlacement): string {
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
  }
}
