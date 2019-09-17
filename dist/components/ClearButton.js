"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = require(".");

var _context = require("../context");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _rxq = require("rxq");

var _reactJss = require("react-jss");

var _classnames = _interopRequireDefault(require("classnames"));

var _refresh = _interopRequireDefault(require("../resources/images/refresh.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var styles = {
  clearButton: {
    "&:hover": {
      backgroundColor: "#fff"
    }
  },
  clearButton__refreshIcon: {
    width: "12px"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var classes = _ref.classes;
  var doc$ = (0, _context.useSession)()[0].rxq.doc$;
  var clear$ = (0, _react.useRef)(new _rxjs.Subject()).current;
  (0, _react.useEffect)(function () {
    var sub$ = clear$.pipe((0, _operators.withLatestFrom)(doc$), (0, _operators.pluck)(1), (0, _rxq.qAskReplay)("ClearAll")).subscribe();
    return function () {
      return sub$.unsubscribe();
    };
  }, [clear$, doc$]);
  return _react["default"].createElement(_.Button, {
    theme: "light",
    className: (0, _classnames["default"])("clear-button", classes.clearButton),
    Icon: _react["default"].createElement("img", {
      className: (0, _classnames["default"])("clear-button__refresh-icon", classes.clearButton__refreshIcon),
      src: _refresh["default"]
    }),
    onClick: function onClick() {
      return clear$.next();
    }
  }, "Clear Filters");
});

exports["default"] = _default;