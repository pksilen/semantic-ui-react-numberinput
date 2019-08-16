import React from 'react';
import { mount, shallow as renderShallow } from 'enzyme';
import { Button } from 'semantic-ui-react';
import NumberInput from './NumberInput';

let onChangeMock;
let consoleErrorSpy;
const NON_INTEGER_VALUE = 1.1;

beforeEach(() => {
  onChangeMock = jest.fn();
  consoleErrorSpy = jest.spyOn(global.console, 'error');
});

test('NumberInput should render correctly', () => {
  const numberInput = renderShallow(<NumberInput value="1" onChange={onChangeMock} />);
  expect(numberInput).toMatchSnapshot();
});

test('NumberInput should render correctly when buttonPlacement is right', () => {
  const numberInput = renderShallow(
    <NumberInput buttonPlacement="right" value="1" onChange={onChangeMock} />
  );
  expect(numberInput).toMatchSnapshot();
});

test('NumberInput sets default props correctly', () => {
  const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);

  expect(numberInput.props().value).toBe('1');
  expect(numberInput.props().onChange).toBe(onChangeMock);
  expect(numberInput.props().id).toBe(null);
  expect(numberInput.props().buttonPlacement).toBe('leftAndRight');
  expect(numberInput.props().className).toBe(null);
  expect(numberInput.props().minValue).toBe(-999999999);
  expect(numberInput.props().maxValue).toBe(9999999999);
  expect(numberInput.props().maxLength).toBe(10);
  expect(numberInput.props().precision).toBe(2);
  expect(numberInput.props().size).toBe('small');
  expect(numberInput.props().stepAmount).toBe(1);
  expect(numberInput.props().valueType).toBe('integer');
});

test('pressing NumberInput´s decrement button decrements value (valueType is integer)', () => {
  const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('0');
});

test('pressing NumberInput´s decrement button decrements value (valueType is decimal)', () => {
  const numberInput = mount(
    <NumberInput value="2.0" valueType="decimal" precision={2} stepAmount={0.25} onChange={onChangeMock} />
  );
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('1.75');
});

test('pressing NumberInput´s increment button increments value (valueType is integer)', () => {
  const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('2');
});

test('pressing NumberInput´s increment button increments value (valueType is decimal)', () => {
  const numberInput = mount(<NumberInput value="0.12" valueType="decimal" precision={1} stepAmount={0.1} onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('0.2');
});

test('NumberInput´s increment button with negative value', () => {
  const numberInput = mount(<NumberInput value="-2" onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('-1');
});

test('pressing NumberInput´s decrement button decrements value by given stepAmount', () => {
  const numberInput = mount(<NumberInput value="3" stepAmount={2} onChange={onChangeMock} />);
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('1');
});

test('pressing NumberInput´s increment button increments value by given stepAmount', () => {
  const numberInput = mount(<NumberInput value="1" stepAmount={2} onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('3');
});

test('NumberInput´s decrement button with negative value', () => {
  const numberInput = mount(<NumberInput value="-2" onChange={onChangeMock} />);
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).toHaveBeenCalledWith('-3');
});

test('pressing NumberInput`s decrement button does not decrement value beyond minimum safe integer value', () => {
  const numberInput = mount(
    <NumberInput value={Number.MIN_SAFE_INTEGER.toString()} onChange={onChangeMock} />
  );
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
});

test('pressing NumberInput´s increment button does not increment value beyond maximum safe integer value', () => {
  const numberInput = mount(
    <NumberInput value={Number.MAX_SAFE_INTEGER.toString()} onChange={onChangeMock} />
  );
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
});

test('pressing NumberInput´s decrement button does not decrement value if current value is minValue', () => {
  const numberInput = mount(<NumberInput value="5" minValue={5} onChange={onChangeMock} />);
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
  expect(decrementButton.hasClass('disabled')).toBe(true);
});

test('pressing NumberInput´s decrement button does not decrement value beyond minValue', () => {
  const numberInput = mount(<NumberInput value="5" minValue={4} stepAmount={2} onChange={onChangeMock} />);
  const decrementButton = numberInput.find('button').first();

  decrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
  expect(decrementButton.hasClass('disabled')).toBe(true);
});

test('pressing NumberInput´s increment button does not increment value if current value is maxValue', () => {
  const numberInput = mount(<NumberInput value="5" maxValue={5} onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
  expect(incrementButton.hasClass('disabled')).toBe(true);
});

test('pressing NumberInput´s increment button does not increment value beyond given maxValue', () => {
  const numberInput = mount(<NumberInput value="4" maxValue={5} stepAmount={2} onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
  expect(incrementButton.hasClass('disabled')).toBe(true);
});

test('changing NumberInput´s input value (valueType is integer)', () => {
  const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('change', { target: { value: '3' } });

  expect(onChangeMock).toHaveBeenCalledWith('3');
});

test('changing NumberInput´s input value (valueType is decimal)', () => {
  const numberInput = mount(<NumberInput value="1" valueType="decimal" precision={2} onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('change', { target: { value: '3.245' } });

  expect(onChangeMock).toHaveBeenCalledWith('3.25');
});

test('trying to change NumberInput´s input value beyond minValue', () => {
  const numberInput = mount(<NumberInput value="1" minValue={0} onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('change', { target: { value: '-1' } });

  expect(onChangeMock).not.toHaveBeenCalled();
});

test('trying to change NumberInput´s input value beyond maxValue', () => {
  const numberInput = mount(<NumberInput value="1" maxValue={10} onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('change', { target: { value: '11' } });

  expect(onChangeMock).not.toHaveBeenCalled();
});

test('trying to change NumberInput´s input value to non-numeric value', () => {
  const numberInput = mount(<NumberInput value="1" onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('change', { target: { value: 'x' } });

  expect(onChangeMock).not.toHaveBeenCalled();
});

test('className prop sets className for outer div', () => {
  const numberInput = mount(<NumberInput className="test" value="1" onChange={onChangeMock} />);
  const outerDiv = numberInput.find('div').first();

  expect(outerDiv.hasClass('test')).toBe(true);
});

test('id prop sets id for outer div', () => {
  const numberInput = mount(<NumberInput id="numberInput1" value="1" onChange={onChangeMock} />);
  expect(numberInput.exists('div#numberInput1')).toBe(true);
});

test('NumberInput should work correctly when trying to change input value beyond maxLength', () => {
  const numberInput = mount(<NumberInput value="99" maxLength={2} onChange={onChangeMock} />);
  const input = numberInput.find('input');

  input.simulate('focus');
  input.simulate('keypress', { key: '9' });

  expect(input.props().value).toBe('99');
  expect(onChangeMock).not.toHaveBeenCalled();
});

test('NumberInput should work correctly when trying to increment value beyond maxLength', () => {
  const numberInput = mount(<NumberInput value="99" maxLength={2} onChange={onChangeMock} />);
  const incrementButton = numberInput.find('button').last();

  incrementButton.simulate('click');

  expect(onChangeMock).not.toHaveBeenCalled();
  expect(incrementButton.hasClass('disabled')).toBe(true);
});

test('size prop is correctly propagated to sub components', () => {
  const numberInput = mount(<NumberInput value="99" size="mini" onChange={onChangeMock} />);
  const decrementButton = numberInput.find(Button).first();
  const incrementButton = numberInput.find(Button).last();
  const inputDiv = numberInput.find('div > div');

  expect(decrementButton.props().size).toBe('mini');
  expect(incrementButton.props().size).toBe('mini');
  expect(inputDiv.hasClass('mini')).toBe(true);
});

test('value prop is valid', () => {
  renderShallow(<NumberInput value="" onChange={onChangeMock} />);
  renderShallow(<NumberInput value="x" onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('value is required'));
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('value must be a string that can be parsed to an integer')
  );
});

test('maxValue prop is valid', () => {
  renderShallow(<NumberInput value="1" maxValue={NON_INTEGER_VALUE} onChange={onChangeMock} />);
  renderShallow(<NumberInput value="1" minValue={0} maxValue={100} maxLength={2} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('maxValue must be an integer'));
  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('maxValue does not fit in maxLength'));
});

test('minValue prop is valid', () => {
  renderShallow(<NumberInput value="1" minValue={NON_INTEGER_VALUE} onChange={onChangeMock} />);
  renderShallow(<NumberInput value="1" minValue={-99} maxValue={99} maxLength={2} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('minValue must be an integer'));
  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('minValue does not fit in maxLength'));
});

test('minValue cannot be greater than maxValue', () => {
  renderShallow(<NumberInput value="1" minValue={2} maxValue={1} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('maxValue must greater than or equal to minValue')
  );
});

test('maxLength prop must be a positive integer', () => {
  renderShallow(<NumberInput value="1" maxLength={0} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('maxLength must be a positive integer')
  );
});

test('minValue and maxValue must fit in maxLength', () => {
  renderShallow(<NumberInput value="1" maxLength={1} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('maxValue does not fit in maxLength'));
  expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('minValue does not fit in maxLength'));
});

test('stepAmount prop is valid', () => {
  renderShallow(<NumberInput value="1" stepAmount={-2} onChange={onChangeMock} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('stepAmount must be a positive integer')
  );
});
