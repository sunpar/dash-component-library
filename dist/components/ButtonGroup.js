"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  buttonGroup: {
    display: "flex"
  },
  buttonGroup__button: {
    flexGrow: 1,
    margin: "0 5px"
  },
  buttonGroup__button_inactive: {
    color: "#979797",
    borderColor: "#979797"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var buttons = _ref.buttons,
      selectedButton = _ref.selectedButton,
      onChange = _ref.onChange,
      classes = _ref.classes;
  var _onClick = onChange;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])("button-group", classes.buttonGroup)
  }, buttons.map(function (button) {
    return _react["default"].createElement(_.Button, {
      key: button.name,
      className: (0, _classnames["default"])("button-group__button", classes.buttonGroup__button, _defineProperty({}, classes.buttonGroup__button_inactive, button.name !== selectedButton)),
      size: "lg",
      theme: button.name === selectedButton ? "dark" : "light",
      onClick: function onClick() {
        return _onClick(button.name);
      }
    }, button.label);
  }));
});

exports["default"] = _default;