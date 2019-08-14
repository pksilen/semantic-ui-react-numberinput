"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buttonStyle = {
  borderRadius: 0,
  lineHeight: 'calc(1em + 2px)',
  margin: 0
};
var inputStyle = {
  borderRadius: 0,
  textAlign: 'right'
}; // noinspection JSUnusedGlobalSymbols

var NumberInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberInput, _React$Component);

  function NumberInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NumberInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NumberInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "decrementValue", function () {
      var _this$props = _this.props,
          minValue = _this$props.minValue,
          onChange = _this$props.onChange,
          stepCount = _this$props.stepCount,
          value = _this$props.value;
      var valueAsInteger = parseInt(value, 10);

      if (Number.isSafeInteger(valueAsInteger)) {
        var newValueAsInteger = valueAsInteger - stepCount;

        if (newValueAsInteger >= minValue) {
          onChange(newValueAsInteger.toString());
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "incrementValue", function () {
      var _this$props2 = _this.props,
          maxValue = _this$props2.maxValue,
          onChange = _this$props2.onChange,
          stepCount = _this$props2.stepCount,
          value = _this$props2.value;
      var valueAsInteger = parseInt(value, 10);

      if (Number.isSafeInteger(valueAsInteger)) {
        var newValueAsInteger = valueAsInteger + stepCount;

        if (newValueAsInteger <= maxValue) {
          onChange(newValueAsInteger.toString());
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeValue", function (_ref) {
      var newValue = _ref.target.value;
      var _this$props3 = _this.props,
          maxValue = _this$props3.maxValue,
          minValue = _this$props3.minValue,
          onChange = _this$props3.onChange;
      var newValueAsInteger = parseInt(newValue, 10);

      if (Number.isSafeInteger(newValueAsInteger)) {
        if (newValueAsInteger >= minValue && newValueAsInteger <= maxValue) {
          onChange(newValueAsInteger.toString());
        }
      }
    });

    return _this;
  }

  _createClass(NumberInput, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          id = _this$props4.id,
          maxLength = _this$props4.maxLength,
          maxValue = _this$props4.maxValue,
          minValue = _this$props4.minValue,
          size = _this$props4.size,
          stepCount = _this$props4.stepCount,
          value = _this$props4.value;
      var valueAsInteger = parseInt(value, 10);
      var valueIsNotANumber = Number.isNaN(valueAsInteger);
      return _react["default"].createElement("div", {
        id: id,
        className: className
      }, _react["default"].createElement(_semanticUiReact.Button, {
        size: size,
        style: buttonStyle,
        icon: "minus",
        onClick: this.decrementValue,
        disabled: valueIsNotANumber || valueAsInteger - stepCount <= minValue
      }), _react["default"].createElement("div", {
        className: "ui input ".concat(size)
      }, _react["default"].createElement("input", {
        type: "text",
        style: inputStyle,
        maxLength: maxLength,
        value: value,
        onChange: this.changeValue
      })), _react["default"].createElement(_semanticUiReact.Button, {
        size: size,
        style: buttonStyle,
        icon: "plus",
        onClick: this.incrementValue,
        disabled: valueIsNotANumber || valueAsInteger + stepCount >= maxValue || (valueAsInteger + stepCount).toString().length > maxLength
      }));
    }
  }]);

  return NumberInput;
}(_react["default"].Component);

exports["default"] = NumberInput;

_defineProperty(NumberInput, "propTypes", {
  id: _propTypes["default"].string,
  // eslint-disable-next-line react/require-default-props
  value: function value(props) {
    if (!props.value) {
      return new Error('value is required');
    }

    if (!Number.isSafeInteger(parseInt(props.value, 10))) {
      return new Error('value must be a string that can be parsed to an integer');
    }

    return null;
  },
  onChange: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  minValue: function minValue(props) {
    if (!Number.isSafeInteger(props.minValue)) {
      return new Error('minValue must be an integer');
    }

    if (props.minValue >= props.maxValue) {
      return new Error('maxValue must greater than minValue');
    }

    return null;
  },
  maxValue: function maxValue(props) {
    if (!Number.isSafeInteger(props.maxValue)) {
      return new Error('maxValue must be an integer');
    }

    if (props.minValue >= props.maxValue) {
      return new Error('maxValue must greater than minValue');
    }

    return null;
  },
  maxLength: function maxLength(props) {
    if (!Number.isSafeInteger(props.maxLength) || props.maxLength < 1) {
      return new Error('maxLength must be a positive integer');
    }

    return null;
  },
  size: _propTypes["default"].oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  stepCount: function stepCount(props) {
    if (!Number.isSafeInteger(props.stepCount) || props.stepCount < 1) {
      return new Error('stepCount must be a positive integer');
    }

    return null;
  }
});

_defineProperty(NumberInput, "defaultProps", {
  id: null,
  className: null,
  minValue: Number.MIN_SAFE_INTEGER,
  maxValue: Number.MAX_SAFE_INTEGER,
  maxLength: 10,
  size: 'small',
  stepCount: 1
});
//# sourceMappingURL=NumberInput.js.map