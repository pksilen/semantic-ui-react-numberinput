import PropValidators from './PropValidators';

describe('validateValue(props: Props)', () => {
  it('should not throw if allowEmptyValue is true and value is empty', () => {
    PropValidators.validateValue({
      allowEmptyValue: true,
      value: ''
    });
  });

  it('should throw if allowEmptyValue is false and value is empty', () => {
    expect(() =>
      PropValidators.validateValue({
        allowEmptyValue: false,
        value: ''
      })
    ).toThrow();
  });

  it('should not throw if value is valid', () => {
    PropValidators.validateValue({
      allowEmptyValue: false,
      value: '2',
      valueType: 'integer'
    });
  });

  it('should throw if value is not valid', () => {
    expect(() =>
      PropValidators.validateValue({
        allowEmptyValue: false,
        value: 'x',
        valueType: 'integer'
      })
    ).toThrow();
  });
});

describe('validateDefaultValue(props: Props)', () => {
  it('should not throw if defaultValue is missing', () => {
    PropValidators.validateDefaultValue({});
  });

  it('should not throw if defaultValue is valid', () => {
    PropValidators.validateDefaultValue({
      defaultValue: 10,
      valueType: 'integer'
    });
  });

  it('should throw if defaultValue is not valid', () => {
    expect(() =>
      PropValidators.validateDefaultValue({
        defaultValue: 'x',
        valueType: 'integer'
      })
    ).toThrow();
  });
});

describe('validateMinValue(props: Props)', () => {
  it('should not throw if minValue is valid', () => {
    PropValidators.validateMinValue({
      minValue: 10,
      valueType: 'integer'
    });
  });

  it('should throw if minValue is greater than maxValue', () => {
    expect(() =>
      PropValidators.validateMinValue({
        minValue: 11,
        maxValue: 10
      })
    ).toThrow();
  });

  it('should throw if minValue length greater than maxLength', () => {
    expect(() =>
      PropValidators.validateMinValue({
        minValue: 111,
        maxLength: 2
      })
    ).toThrow();
  });

  it('should throw if minValue is not valid', () => {
    expect(() =>
      PropValidators.validateMinValue({
        minValue: 'x',
        valueType: 'integer'
      })
    ).toThrow();
  });
});

describe('validateMaxValue(props: Props)', () => {
  it('should not throw if maxValue is valid', () => {
    PropValidators.validateMaxValue({
      maxValue: 10,
      valueType: 'integer'
    });
  });

  it('should throw if maxValue length greater than maxLength', () => {
    expect(() =>
      PropValidators.validateMaxValue({
        minValue: 111,
        maxLength: 2
      })
    ).toThrow();
  });

  it('should throw if maxValue is not valid', () => {
    expect(() =>
      PropValidators.validateMaxValue({
        maxValue: '',
        valueType: 'integer'
      })
    ).toThrow();
  });
});

describe('validateMaxLength(props: Props)', () => {
  it('should not throw if maxLength is positive integer', () => {
    PropValidators.validateMaxLength({
      maxLength: 1
    });
  });

  test.each([[0], [-1]])('it should throw if maxLength is not positive integer', (maxLength) => {
    expect(() =>
      PropValidators.validateMaxLength({
        maxLength
      })
    ).toThrow();
  });
});

describe('validatePrecision(props: Props)', () => {
  it('should not throw if precision is positive integer', () => {
    PropValidators.validatePrecision({
      precision: 1
    });
  });

  test.each([[0], [-1]])('it should throw if precision is not positive integer', (precision) => {
    expect(() =>
      PropValidators.validatePrecision({
        precision
      })
    ).toThrow();
  });
});

describe('validateStepAmount(props: Props)', () => {
  it('should not throw if stepAmount is positive integer/decimal', () => {
    PropValidators.validateStepAmount({
      stepAmount: 1.25,
      valueType: 'decimal'
    });
  });

  test.each([[0], [-1.25]])(
    'it should throw  if stepAmount is not positive integer/decimal',
    (stepAmount) => {
      expect(() =>
        PropValidators.validateStepAmount({
          stepAmount,
          valueType: 'decimal'
        })
      ).toThrow();
    }
  );
});
