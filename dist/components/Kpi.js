"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  kpi: {
    textAlign: "center"
  },
  kpi__label: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#979797"
  },
  kpi__value: {
    fontSize: "64px",
    fontWeight: "500",
    color: "#ffb800"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var label = _ref.label,
      className = _ref.className,
      classes = _ref.classes,
      children = _ref.children;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])("kpi", classes.kpi, className)
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])("kpi__label", classes.kpi__label)
  }, label), _react["default"].createElement("div", {
    className: (0, _classnames["default"])("kpi__value", classes.kpi__value)
  }, children));
});

exports["default"] = _default;