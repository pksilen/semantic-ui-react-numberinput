import PropValidators from './PropValidators';

describe('validateValue(props: Props): ?Error', () => {
  it('should return null if allowEmptyValue is true and value is empty', () => {
    const possibleError = PropValidators.validateValue({
      allowEmptyValue: true,
      value: ''
    });
    expect(possibleError).toBeNull();
  });

  it('should return Error if allowEmptyValue is false and value is empty', () => {
    const possibleError = PropValidators.validateValue({
      allowEmptyValue: false,
      value: ''
    });
    expect(possibleError).not.toBeNull();
  });

  it('should return null if value is valid', () => {
    const possibleError = PropValidators.validateValue({
      allowEmptyValue: false,
      value: '2',
      valueType: 'integer'
    });
    expect(possibleError).toBeNull();
  });

  it('should return error if value is not valid', () => {
    const possibleError = PropValidators.validateValue({
      allowEmptyValue: false,
      value: 'x',
      valueType: 'integer'
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validateDefaultValue(props: Props): ?Error', () => {
  it('should return null if defaultValue is missing', () => {
    const possibleError = PropValidators.validateDefaultValue({});
    expect(possibleError).toBeNull();
  });

  it('should return null if defaultValue is valid', () => {
    const possibleError = PropValidators.validateDefaultValue({
      defaultValue: 10,
      valueType: 'integer'
    });
    expect(possibleError).toBeNull();
  });

  it('should return error if defaultValue is not valid', () => {
    const possibleError = PropValidators.validateDefaultValue({
      defaultValue: 'x',
      valueType: 'integer'
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validateMinValue(props: Props): ?Error', () => {
  it('should return error if minValue is greater than maxValue', () => {
    const possibleError = PropValidators.validateMinValue({
      minValue: 11,
      maxValue: 10
    });
    expect(possibleError).not.toBeNull();
  });

  it('should return error if minValue length greater than maxLength', () => {
    const possibleError = PropValidators.validateMinValue({
      minValue: 111,
      maxLength: 2
    });
    expect(possibleError).not.toBeNull();
  });

  it('should return null if minValue is valid', () => {
    const possibleError = PropValidators.validateMinValue({
      minValue: 10,
      valueType: 'integer'
    });
    expect(possibleError).toBeNull();
  });

  it('should return error if minValue is not valid', () => {
    const possibleError = PropValidators.validateMinValue({
      minValue: 'x',
      valueType: 'integer'
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validateMaxValue(props: Props): ?Error', () => {
  it('should return error if maxValue length greater than maxLength', () => {
    const possibleError = PropValidators.validateMaxValue({
      minValue: 111,
      maxLength: 2
    });
    expect(possibleError).not.toBeNull();
  });

  it('should return null if maxValue is valid', () => {
    const possibleError = PropValidators.validateMaxValue({
      maxValue: 10,
      valueType: 'integer'
    });
    expect(possibleError).toBeNull();
  });

  it('should return error if maxValue is not valid', () => {
    const possibleError = PropValidators.validateMaxValue({
      maxValue: '',
      valueType: 'integer'
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validateMaxLength(props: Props): ?Error', () => {
  it('should return null if maxLength is positive integer', () => {
    const possibleError = PropValidators.validateMaxLength({
      maxLength: 1
    });
    expect(possibleError).toBeNull();
  });

  test.each([[0], [-1]])('it should return error if maxLength is not positive integer', (maxLength) => {
    const possibleError = PropValidators.validateMaxLength({
      maxLength
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validatePrecision(props: Props): ?Error', () => {
  it('should return null if precision is positive integer', () => {
    const possibleError = PropValidators.validatePrecision({
      precision: 1
    });
    expect(possibleError).toBeNull();
  });

  test.each([[0], [-1]])('it should return error if precision is not positive integer', (precision) => {
    const possibleError = PropValidators.validatePrecision({
      precision
    });
    expect(possibleError).not.toBeNull();
  });
});

describe('validateStepAmount(props: Props): ?Error', () => {
  it('should return null if stepAmount is positive integer/decimal', () => {
    const possibleError = PropValidators.validateStepAmount({
      stepAmount: 1.25,
      valueType: 'decimal'
    });
    expect(possibleError).toBeNull();
  });

  test.each([[0], [-1.25]])(
    'it should return error if stepAmount is not positive integer/decimal',
    (stepAmount) => {
      const possibleError = PropValidators.validateStepAmount({
        stepAmount,
        valueType: 'decimal'
      });
      expect(possibleError).not.toBeNull();
    }
  );
});
