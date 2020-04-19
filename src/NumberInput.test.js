import React from 'react';
import PropTypes from 'prop-types';
import { ActiveListener } from 'react-event-injector';
import { mount, shallow as renderShallow } from 'enzyme';
import NumberInput from './NumberInput';

let onChangeMock;

process.env.NODE_ENV = 'development';

beforeEach(() => {
  onChangeMock = jest.fn();
});

describe('propTypes', () => {
  it('should validate value prop', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = NumberInput;

    expect(propTypes.value).toBe(PropTypes.string.isRequired);
    expect(propTypes.onChange).toBe(PropTypes.func.isRequired);
    expect(propTypes.allowEmptyValue).toBe(PropTypes.bool);
    expect(propTypes.buttonPlacement).toBeTruthy();
    expect(propTypes.className).toBe(PropTypes.string);
    expect(propTypes.defaultValue).toBe(PropTypes.number);
    expect(propTypes.id).toBe(PropTypes.string);
    expect(propTypes.minValue).toBe(PropTypes.number);
    expect(propTypes.maxValue).toBe(PropTypes.number);
    expect(propTypes.maxLength).toBe(PropTypes.number);
    expect(propTypes.placeholder).toBe(PropTypes.string);
    expect(propTypes.precision).toBe(PropTypes.number);
    expect(propTypes.showError).toBe(PropTypes.bool);
    expect(propTypes.size).toBeTruthy();
    expect(propTypes.stepAmount).toBe(PropTypes.number);
    expect(propTypes.showError).toBeTruthy();
  });
});

describe('defaultProps', () => {
  it('should set default prop values correctly', () => {
    const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);

    expect(numberInput.props().allowEmptyValue).toBe(false);
    expect(numberInput.props().buttonPlacement).toBe('leftAndRight');
    expect(numberInput.props().className).toBe(undefined);
    expect(numberInput.props().defaultValue).toBe(undefined);
    expect(numberInput.props().id).toBe(undefined);
    expect(numberInput.props().minValue).toBe(0);
    expect(numberInput.props().maxValue).toBe(9999999999);
    expect(numberInput.props().maxLength).toBe(10);
    expect(numberInput.props().placeholder).toBe('Enter a value');
    expect(numberInput.props().precision).toBe(2);
    expect(numberInput.props().showError).toBe(false);
    expect(numberInput.props().size).toBe('small');
    expect(numberInput.props().stepAmount).toBe(1);
    expect(numberInput.props().valueType).toBe('integer');
  });
});

describe('decrementOrIncrementValue()', () => {
  it('should decrement value by given stepAmount', () => {
    const numberInput = mount(<NumberInput value="3" stepAmount={2} onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('1');
  });

  it('should decrement negative value', () => {
    jest.useFakeTimers();
    const numberInput = mount(
      <NumberInput doubleClickStepAmount={4} value="-2" minValue={-100} onChange={onChangeMock} />
    );
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');
    jest.advanceTimersByTime(NumberInput.DOUBLE_CLICK_DELAY_IN_MILLIS + 100);

    expect(onChangeMock).toHaveBeenCalledWith('-3');
  });

  it('should not decrement value beyond minimum safe integer value when valueType is "integer"', () => {
    const numberInput = mount(
      <NumberInput value={Number.MIN_SAFE_INTEGER.toString()} onChange={onChangeMock} />
    );
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should decrement value when current value is one step from minValue', () => {
    const numberInput = mount(<NumberInput value="6" minValue={5} onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('5');
    expect(decrementButton.hasClass('disabled')).toBe(false);
  });

  it('should not decrement value if current value is minValue', () => {
    const numberInput = mount(<NumberInput value="5" minValue={5} onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(decrementButton.hasClass('disabled')).toBe(true);
  });

  it('should not decrement value beyond minValue', () => {
    const numberInput = mount(<NumberInput value="5" minValue={4} stepAmount={2} onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(decrementButton.hasClass('disabled')).toBe(true);
  });

  it('should not decrement empty value', () => {
    const numberInput = mount(<NumberInput allowEmptyValue value="" onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(decrementButton.hasClass('disabled')).toBe(true);
  });

  it('should increment value by given stepAmount', () => {
    const numberInput = mount(<NumberInput value="1" stepAmount={2} onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('3');
  });

  it('should increment negative value', () => {
    const numberInput = mount(<NumberInput minValue={-10} value="-2" onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('-1');
  });

  it('should not increment value beyond maximum safe integer value when valueType is "integer"', () => {
    const numberInput = mount(
      <NumberInput value={Number.MAX_SAFE_INTEGER.toString()} onChange={onChangeMock} />
    );
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should increment value when current value is one step from maxValue', () => {
    const numberInput = mount(<NumberInput value="4" maxValue={5} onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('5');
    expect(incrementButton.hasClass('disabled')).toBe(false);
  });

  it('should not increment value if current value is maxValue', () => {
    const numberInput = mount(<NumberInput value="5" maxValue={5} onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(incrementButton.hasClass('disabled')).toBe(true);
  });

  it('should not increment value beyond given maxValue', () => {
    const numberInput = mount(<NumberInput value="4" maxValue={5} stepAmount={2} onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(incrementButton.hasClass('disabled')).toBe(true);
  });

  it('should not increment empty value', () => {
    const numberInput = mount(<NumberInput allowEmptyValue value="" onChange={onChangeMock} />);
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(incrementButton.hasClass('disabled')).toBe(true);
  });

  it('should not decrement value beyond minValue on double click', () => {
    const numberInput = mount(<NumberInput doubleClickStepAmount={4} value="2" onChange={onChangeMock} />);
    const decrementButton = numberInput.find('button').first();

    decrementButton.simulate('click');
    decrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('0');
  });

  it('should not increment value beyond maxValue on double click', () => {
    const numberInput = mount(
      <NumberInput doubleClickStepAmount={4} value="2" maxValue={3} onChange={onChangeMock} />
    );
    const incrementButton = numberInput.find('button').last();

    incrementButton.simulate('click');
    incrementButton.simulate('click');

    expect(onChangeMock).toHaveBeenCalledWith('3');
  });
});

describe('changeValue()', () => {
  it('should call onChange with new value', () => {
    const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '3' } });

    expect(onChangeMock).toHaveBeenCalledWith('3');
  });

  it('should call onChange with decimal number rounded to given precision', () => {
    const numberInput = mount(
      <NumberInput value="1" valueType="decimal" precision={2} onChange={onChangeMock} />
    );
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '3.245' } });

    expect(onChangeMock).toHaveBeenCalledWith('3.25');
  });

  it('should not allow changing value beyond minValue', () => {
    const numberInput = mount(<NumberInput value="1" minValue={0} onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '-1' } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should not allow changing value beyond maxValue', () => {
    const numberInput = mount(<NumberInput value="1" maxValue={10} onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '11' } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should not allow changing value to non-numeric value', () => {
    const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: 'x' } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should not allow changing value to empty if allowEmptyValue is false', () => {
    const numberInput = mount(<NumberInput allowEmptyValue={false} value="1" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '' } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should allow changing value to empty if allowEmptyValue is true', () => {
    const numberInput = mount(<NumberInput allowEmptyValue value="1" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('change', { target: { value: '' } });

    expect(onChangeMock).toHaveBeenCalledWith('');
  });
});

describe('onInputBlur()', () => {
  it('should change value to defaultValue if value is empty', () => {
    const numberInput = mount(
      <NumberInput allowEmptyValue defaultValue={10} value="" onChange={onChangeMock} />
    );
    const input = numberInput.find('input');

    input.simulate('blur');

    expect(onChangeMock).toHaveBeenCalledWith('10');
  });

  it('should not change value if defaultValue is not defined and value is empty', () => {
    const numberInput = mount(<NumberInput allowEmptyValue value="" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('blur');

    expect(input.props().value).toBe('');
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('should not change value if value is not empty', () => {
    const numberInput = mount(<NumberInput allowEmptyValue value="10" onChange={onChangeMock} />);
    const input = numberInput.find('input');

    input.simulate('blur');

    expect(input.props().value).toBe('10');
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});

describe('onKeyDown()', () => {
  test.each([
    ['ArrowUp', false, '11'],
    ['+', false, '11'],
    ['ArrowDown', false, '9'],
    ['-', false, '9'],
    ['ArrowUp', true, '14'],
    ['+', true, '14'],
    ['ArrowDown', true, '6'],
    ['-', true, '6'],
    ['PageUp', false, '14'],
    ['PageDown', false, '6']
  ])('it should increment/decrement value when key is pressed', (key, ctrlKey, newValue) => {
    const numberInput = mount(
      <NumberInput allowEmptyValue doubleClickStepAmount={4} value="10" onChange={onChangeMock} />
    );
    const input = numberInput.find('input');

    input.simulate('focus');
    input.simulate('keydown', { key, ctrlKey });

    expect(onChangeMock).toHaveBeenCalledWith(newValue);
  });
});

describe('onWheel()', () => {
  it('should increment value when wheel is rotated upwards', () => {
    const numberInput = mount(
      <NumberInput allowMouseWheel doubleClickStepAmount={4} value="10" onChange={onChangeMock} />
    );
    const activeListener = numberInput.find(ActiveListener);

    activeListener.props().onWheel({ deltaY: 1, preventDefault: jest.fn() });

    expect(onChangeMock).toHaveBeenCalledWith('11');
  });

  it('should decrement value when wheel is rotated downwards', () => {
    const numberInput = mount(
      <NumberInput allowMouseWheel doubleClickStepAmount={4} value="10" onChange={onChangeMock} />
    );
    const activeListener = numberInput.find(ActiveListener);

    activeListener.props().onWheel({ deltaY: -2, preventDefault: jest.fn() });

    expect(onChangeMock).toHaveBeenCalledWith('8');
  });
});

describe('render()', () => {
  it('should validate props and throw upon invalid prop in development mode', () => {
    expect(() =>
      renderShallow(<NumberInput allowEmptyValue={false} onChange={onChangeMock} value="" />)
    ).toThrow();
  });

  it('should render component correctly when buttonPlacement is "leftAndRight"', () => {
    const numberInput = renderShallow(
      <NumberInput
        buttonPlacement="leftAndRight"
        className="testClassName"
        id="testId"
        onChange={onChangeMock}
        placeholder="testPlaceholder"
        size="large"
        value="1"
      />
    );

    expect(numberInput).toMatchSnapshot();
  });

  it('should render component correctly when buttonPlacement is "right"', () => {
    const numberInput = renderShallow(
      <NumberInput
        buttonPlacement="right"
        className="testClassName"
        id="testId"
        onChange={onChangeMock}
        placeholder="testPlaceholder"
        size="large"
        value="1"
      />
    );

    expect(numberInput).toMatchSnapshot();
  });

  it('should render component correctly with button tooltips when doubleClickStepAmount is greater than zero', () => {
    const numberInput = renderShallow(
      <NumberInput doubleClickStepAmount={2} onChange={onChangeMock} value="1" />
    );

    expect(numberInput).toMatchSnapshot();
  });

  it('should render component correctly without button tooltips when showTooltips is false', () => {
    const numberInput = renderShallow(
      <NumberInput doubleClickStepAmount={2} onChange={onChangeMock} showTooltips={false} value="1" />
    );

    expect(numberInput).toMatchSnapshot();
  });

  it('should render component correctly when showError is true', () => {
    const numberInput = renderShallow(<NumberInput onChange={onChangeMock} showError value="1" />);

    expect(numberInput).toMatchSnapshot();
  });

  it('should render component correctly when it is disabled', () => {
    const numberInput = renderShallow(<NumberInput onChange={onChangeMock} disabled value="1" />);

    expect(numberInput).toMatchSnapshot();
  });
});
