"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  switchBase: {
    color: "#4A4A4A",
    "&$checked": {
      color: "#4A4A4A"
    },
    "&$checked + $track": {
      backgroundColor: "#C4C4C4"
    },
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&$checked:hover": {
      backgroundColor: "transparent"
    }
  },
  thumb: {
    boxShadow: "none"
  },
  checked: {},
  track: {
    backgroundColor: "#C4C4C4"
  },
  labels: {
    fontSize: "12px",
    fontWeight: 500
  },
  deSelected: {
    color: "#C4C4C4"
  }
};

var Switch = function Switch(_ref) {
  var textLeft = _ref.textLeft,
      valueLeft = _ref.valueLeft,
      textRight = _ref.textRight,
      valueRight = _ref.valueRight,
      _ref$state = _slicedToArray(_ref.state, 2),
      value = _ref$state[0],
      onChange = _ref$state[1],
      classes = _ref.classes;

  var labels = classes.labels,
      deSelected = classes.deSelected,
      switchClasses = _objectWithoutProperties(classes, ["labels", "deSelected"]);

  var handleChange = function handleChange(_evt, checked) {
    return onChange(checked ? valueRight : valueLeft);
  };

  return _react["default"].createElement("div", {
    className: labels
  }, _react["default"].createElement("span", {
    className: value !== valueLeft ? deSelected : ""
  }, textLeft), _react["default"].createElement(_core.Switch, {
    classes: switchClasses,
    onChange: handleChange,
    disableRipple: true
  }), _react["default"].createElement("span", {
    className: value !== valueRight ? deSelected : ""
  }, textRight));
};

var _default = (0, _reactJss.withStyles)(styles)(Switch);

exports["default"] = _default;