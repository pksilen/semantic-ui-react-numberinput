import ButtonUtils from './ButtonUtils';

const baseProps = {
  maxLength: 10,
  maxValue: 10,
  minValue: -10,
  stepAmount: 1,
  valueType: 'integer'
};

describe('isDisabledButton(buttonType: ButtonType, props: Props)', () => {
  it('should return false if value plus stepAmount is less than maxValue when buttonType is "increment"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('increment', {
      ...baseProps,
      value: '8'
    });

    expect(isDisabledButton).toBe(false);
  });

  it('should return false if value plus stepAmount is equal to maxValue when buttonType is "increment"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('increment', {
      ...baseProps,
      value: '9'
    });

    expect(isDisabledButton).toBe(false);
  });

  it('should return true if value plus stepAmount is greater than maxValue when buttonType is "increment"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('increment', {
      ...baseProps,
      value: '10'
    });

    expect(isDisabledButton).toBe(true);
  });

  it('should return false if value minus stepAmount is greater than minValue when buttonType is "decrement"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('decrement', {
      ...baseProps,
      value: '-8'
    });

    expect(isDisabledButton).toBe(false);
  });

  it('should return false if value minus stepAmount is equal to minValue when buttonType is "decrement"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('decrement', {
      ...baseProps,
      value: '-9'
    });

    expect(isDisabledButton).toBe(false);
  });

  it('should return true if value minus stepAmount is less than minValue when buttonType is "increment"', () => {
    const isDisabledButton = ButtonUtils.isDisabledButton('decrement', {
      ...baseProps,
      value: '-10'
    });

    expect(isDisabledButton).toBe(true);
  });
});

describe('getButtonIconName(buttonType: ButtonType, buttonPlacement: ButtonPlacement): string', () => {
  it('should return "minus" when buttonType is "decrement" and buttonPlacement="leftAndRight', () => {
    const iconName = ButtonUtils.getButtonIconName('decrement', 'leftAndRight');

    expect(iconName).toBe('minus');
  });

  it('should return "plus" when buttonType is "increment" and buttonPlacement="leftAndRight', () => {
    const iconName = ButtonUtils.getButtonIconName('increment', 'leftAndRight');

    expect(iconName).toBe('plus');
  });

  it('should return "caret up" when buttonType is "increment" and buttonPlacement="right', () => {
    const iconName = ButtonUtils.getButtonIconName('increment', 'right');

    expect(iconName).toBe('caret up');
  });

  it('should return "caret down" when buttonType is "decrement" and buttonPlacement="right', () => {
    const iconName = ButtonUtils.getButtonIconName('decrement', 'right');

    expect(iconName).toBe('caret down');
  });
});
