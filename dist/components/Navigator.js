"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  navigator: {
    position: "fixed",
    left: 0,
    top: "100px",
    padding: "6px 8px",
    backgroundColor: "#fff"
  },
  navigator__position: {
    margin: "7px 0",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#c4c4c4"
  },
  navigator__position_selected: {
    backgroundColor: "#4a4a4a"
  },
  navigator__tooltip: {
    position: "fixed",
    left: "26px",
    padding: "4px",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#ffb800",
    borderRadius: "3px",
    whiteSpace: "nowrap",
    transform: "translate(5px, -25%)",
    "&:after": {
      position: "absolute",
      width: 0,
      height: 0,
      content: '" "',
      borderTop: "solid transparent 5px",
      borderBottom: "solid transparent 5px",
      borderRight: "solid #ffb800 5px",
      left: "-5px",
      top: "50%",
      transform: "translateY(-50%)"
    }
  },
  navigator__tooltip_hidden: {
    display: "none"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var positions = _ref.positions,
      classes = _ref.classes;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      selectedPosition = _useState2[0],
      setSelectedPosition = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      refPositions = _useState4[0],
      setRefPositions = _useState4[1];

  (0, _react.useEffect)(function () {
    var scrollPos$ = (0, _rxjs.fromEvent)(document, "scroll").pipe((0, _operators.tap)(function () {
      setRefPositions(positions.map(function (position) {
        return {
          id: position.id,
          y: document.getElementById(position.anchor).getBoundingClientRect().y
        };
      }));
    })).subscribe();
    return function () {
      return scrollPos$.unsubscribe();
    };
  }, [positions]);
  (0, _react.useEffect)(function () {
    if (refPositions.length) {
      if (refPositions[0].y > 0) setSelectedPosition(0);else {
        setSelectedPosition(refPositions.find(function (pos) {
          return pos.y > 0;
        }).id - 1);
      }
    }
  }, [JSON.stringify(refPositions)]);
  var _onClick = setSelectedPosition;

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      tooltipContent = _useState6[0],
      setTooltipContent = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      tooltipPosition = _useState8[0],
      setTooltipPosition = _useState8[1];

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])("navigator", classes.navigator)
  }, positions.map(function (position) {
    return _react["default"].createElement("a", {
      key: position.id,
      href: "#".concat(position.anchor)
    }, _react["default"].createElement("div", {
      className: (0, _classnames["default"])("navigator__position", classes.navigator__position, _defineProperty({}, classes.navigator__position_selected, position.id === selectedPosition)),
      onClick: function onClick() {
        return _onClick(position.id);
      },
      onMouseOver: function onMouseOver(evt) {
        setTooltipPosition(evt.target.getBoundingClientRect().top);
        setTooltipContent(position.label);
      },
      onMouseOut: function onMouseOut() {
        return setTooltipContent(null);
      }
    }));
  }), _react["default"].createElement("div", {
    style: {
      top: "".concat(tooltipPosition, "px")
    },
    className: (0, _classnames["default"])("navigator__tooltip", classes.navigator__tooltip, _defineProperty({}, classes.navigator__tooltip_hidden, tooltipContent === null))
  }, tooltipContent));
});

exports["default"] = _default;