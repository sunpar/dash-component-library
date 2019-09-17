"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

var _ = require(".");

var _classnames = _interopRequireDefault(require("classnames"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  dropdown: {
    position: "relative",
    height: "100%"
  },
  dropdownContainer: {
    position: "absolute",
    zIndex: 10
  },
  dropdownContainer_hidden: {
    display: "none"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var _ref$DropdownButton = _ref.DropdownButton,
      DropdownButton = _ref$DropdownButton === void 0 ? function (_ref2) {
    var onClick = _ref2.onClick;
    return _react["default"].createElement(_.Button, {
      onClick: onClick
    }, "Dropdown");
  } : _ref$DropdownButton,
      dropdownButtonChildren = _ref.dropdownButtonChildren,
      classes = _ref.classes,
      className = _ref.className,
      children = _ref.children;
  var dropdownContainerRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDropdown = _useState2[0],
      setShowDropdown = _useState2[1];

  var showDropdown$ = (0, _react.useRef)(new _rxjs.BehaviorSubject(false)).current;
  (0, _react.useEffect)(function () {
    return showDropdown$.next(showDropdown);
  }, [showDropdown]);
  (0, _react.useEffect)(function () {
    var sub$ = (0, _rxjs.fromEvent)(document, "click").pipe((0, _operators.map)(function (evt) {
      return evt.target;
    }), (0, _operators.withLatestFrom)(showDropdown$), (0, _operators.filter)(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          _el = _ref4[0],
          showDropdown = _ref4[1];

      return showDropdown;
    }), (0, _operators.filter)(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          el = _ref6[0];

      return !dropdownContainerRef.current.contains(el);
    })).subscribe(function () {
      return setShowDropdown(false);
    });
    return function () {
      return sub$.unsubscribe();
    };
  }, [dropdownContainerRef]);
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(classes.dropdown, className)
  }, _react["default"].createElement(DropdownButton, {
    onClick: function onClick() {
      return setShowDropdown(!showDropdown);
    }
  }, dropdownButtonChildren), _react["default"].createElement("div", {
    ref: dropdownContainerRef,
    className: (0, _classnames["default"])("dropdown-container", classes.dropdownContainer, _defineProperty({}, classes.dropdownContainer_hidden, !showDropdown))
  }, children));
});

exports["default"] = _default;