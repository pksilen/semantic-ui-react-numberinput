import Validators from './Validators';

describe('isValidValue (value: number, valueType: ValueType): boolean', () => {
  test.each([
    [10, true],
    [1.25, false],
    [Number.MAX_SAFE_INTEGER, true],
    [-10, true],
    [Number.MIN_SAFE_INTEGER, true],
    [Number.MAX_SAFE_INTEGER + 1, false],
    [Number.MAX_VALUE, false],
    [Infinity, false],
    [NaN, false]
  ])('it should return true if value is safe integer and valueType is "integer"', (value, isValid) => {
    const isValidValue = Validators.isValidValue(value, 'integer');
    expect(isValidValue).toBe(isValid);
  });

  test.each([
    [10, true],
    [1.25, true],
    [Number.MAX_VALUE, true],
    [Number.MIN_VALUE, true],
    [Infinity, false],
    [NaN, false]
  ])('it should return true if value is finite number and valueType is "decimal"', (value, isValid) => {
    const isValidValue = Validators.isValidValue(value, 'decimal');
    expect(isValidValue).toBe(isValid);
  });
});

describe('validatePositiveInteger(value: number, valueName: string)', () => {
  it('should not throw if value is positive integer', () => {
    Validators.validatePositiveInteger(10, 'testValue');
  });

  test.each([[-1], [0], [1.5]])('it should throw if value is not positive integer', (value) => {
    expect(() => Validators.validatePositiveInteger(value, 'testValue')).toThrow();
  });
});
