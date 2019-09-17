"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _context = require("../context");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reactJss = require("react-jss");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  tile: {
    position: "relative",
    padding: "16px",
    backgroundColor: "#fff"
  },
  tileTitle: {
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000"
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var title = _ref.title,
      anchor = _ref.anchor,
      _ref$downloadIds = _ref.downloadIds,
      downloadIds = _ref$downloadIds === void 0 ? [] : _ref$downloadIds,
      className = _ref.className,
      classes = _ref.classes,
      children = _ref.children;
  var doc$ = (0, _context.useSession)()[0].rxq.doc$;
  var download$ = (0, _react.useRef)(new _rxjs.Subject()).current;
  (0, _react.useEffect)(function () {
    var sub$ = download$.pipe((0, _operators.switchMap)(function (id) {
      return (0, _rxjs.from)(id);
    }), (0, _operators.withLatestFrom)(doc$), (0, _operators.mergeMap)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          id = _ref3[0],
          docHandle = _ref3[1];

      return docHandle.ask("GetObject", id);
    }), (0, _operators.mergeMap)(function (objHandle) {
      return objHandle.ask("ExportData", "CSV_C", "/qHyperCubeDef");
    }), (0, _operators.catchError)(function (err) {
      console.log(err);
    })).subscribe(function (_ref4) {
      var qUrl = _ref4.qUrl;
      window.open("https://dash.condenast.com".concat(qUrl));
    });
    return function () {
      return sub$.unsubscribe();
    };
  }, []);
  return _react["default"].createElement("div", {
    id: anchor,
    className: (0, _classnames["default"])("tile", classes.tile, className)
  }, downloadIds.length > 0 ? _react["default"].createElement(_.DownloadButton, {
    downloadIds: downloadIds
  }) : null, title ? _react["default"].createElement("div", {
    className: (0, _classnames["default"])("title", classes.tileTitle)
  }, title) : null, _react["default"].createElement("div", {
    className: "tile__content"
  }, children));
});

exports["default"] = _default;