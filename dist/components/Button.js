"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 10px",
    height: "26px",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  button_dark: {
    backgroundColor: "#4a4a4a",
    color: "#fff"
  },
  button_light: {
    border: "0.5px solid #4a4a4a",
    backgroundColor: "transparent",
    color: "#4a4a4a"
  },
  button_lg: {
    height: "41px",
    padding: "10px 0",
    fontSize: "18px",
    lineHeight: "21px",
    fontWeight: "bold"
  },
  button__iconContainer: {
    position: "relative",
    marginLeft: "10px",
    marginRight: "-5px"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var _classNames;

  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? "dark" : _ref$theme,
      _ref$Icon = _ref.Icon,
      Icon = _ref$Icon === void 0 ? null : _ref$Icon,
      size = _ref.size,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      classes = _ref.classes,
      children = _ref.children;
  return _react["default"].createElement("button", {
    className: (0, _classnames["default"])("button", classes.button, className, (_classNames = {}, _defineProperty(_classNames, classes.button_dark, theme === "dark"), _defineProperty(_classNames, classes.button_light, theme === "light"), _defineProperty(_classNames, classes.button_lg, size === "lg"), _classNames)),
    onClick: onClick
  }, children, Icon !== null ? _react["default"].createElement("div", {
    className: (0, _classnames["default"])("button__icon-container", classes.button__iconContainer)
  }, Icon) : null);
});

exports["default"] = _default;