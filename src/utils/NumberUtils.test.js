import NumberUtils from './NumberUtils';

describe('getParsedValue(value: string, valueType: ValueType): number', () => {
  it('should successfully parse integer value if valueType is "integer"', () => {
    const parsedValue = NumberUtils.getParsedValue('10', 'integer');

    expect(parsedValue).toBe(10);
  });

  it('should successfully parse decimal value to integer if valueType is "integer"', () => {
    const parsedValue = NumberUtils.getParsedValue('1.25', 'integer');

    expect(parsedValue).toBe(1);
  });

  it('should successfully parse decimal value if valueType is "decimal"', () => {
    const parsedValue = NumberUtils.getParsedValue('1.25', 'decimal');

    expect(parsedValue).toBeCloseTo(1.25);
  });

  it('should return NaN if value is empty', () => {
    const parsedValue = NumberUtils.getParsedValue('', 'integer');

    expect(parsedValue).toBeNaN();
  });

  it('should return NaN if value is a not a number', () => {
    const parsedValue = NumberUtils.getParsedValue('xx', 'integer');

    expect(parsedValue).toBeNaN();
  });
});

describe('getValueWithPrecisionAsString(value: number, valueType: ValueType, precision: number): string', () => {
  it('should return value as string if valueType is "integer"', () => {
    const valueAsString = NumberUtils.getValueWithPrecisionAsString(10, 'integer', 2);

    expect(valueAsString).toBe('10');
  });

  test.each([[1.2543, 2, '1.25'], [1.25, 1, '1.3'], [1.0, 5, '1'], [0.3333333, 3, '0.333']])(
    'it should return decimal value with precision as string if valueType is "decimal"',
    (value, precision, expectedValue) => {
      const valueAsString = NumberUtils.getValueWithPrecisionAsString(value, 'decimal', precision);

      expect(valueAsString).toBe(expectedValue);
    }
  );
});
