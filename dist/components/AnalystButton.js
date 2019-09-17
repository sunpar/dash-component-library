"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = require("react-jss");

var _rightArrow = _interopRequireDefault(require("../resources/images/right-arrow.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  analystLink: {
    display: "flex",
    paddingRight: 0,
    border: "none",
    fontSize: "10px",
    fontWeight: 500,
    color: "#4a4a4a",
    textDecoration: "none",
    "&:hover": {
      color: "#4a4a4a"
    },
    "&:visited": {
      color: "#4a4a4a"
    }
  },
  analystLink__arrow: {
    marginLeft: "6px",
    width: "16px"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var className = _ref.className,
      url = _ref.url,
      classes = _ref.classes;
  return _react["default"].createElement("a", {
    className: (0, _classnames["default"])("analyst-link", classes.analystLink, className),
    href: url,
    target: "_blank"
  }, "GO TO ANALYST VIEW", _react["default"].createElement("img", {
    src: _rightArrow["default"],
    className: (0, _classnames["default"])("analyst-link__arrow", classes.analystLink__arrow)
  }));
});

exports["default"] = _default;