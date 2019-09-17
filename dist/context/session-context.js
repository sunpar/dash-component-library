"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSession = exports.SessionProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _qdtComponents = _interopRequireDefault(require("qdt-components"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _rxq = require("rxq");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Convert the incoming qlik config to format supported by qdt */
var qdtConfigGenerator = function qdtConfigGenerator(_ref) {
  var host = _ref.host,
      _ref$isSecure = _ref.isSecure,
      secure = _ref$isSecure === void 0 ? true : _ref$isSecure,
      _ref$port = _ref.port,
      port = _ref$port === void 0 ? 443 : _ref$port,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? "" : _ref$prefix,
      appId = _ref.appname;
  return {
    host: host,
    secure: secure,
    port: port,
    prefix: prefix,
    appId: appId
  };
};
/** Create Context */


var SessionContext = (0, _react.createContext)();
/** Session Component */

var SessionProvider = function SessionProvider(_ref2) {
  var qlikConfig = _ref2.qlikConfig,
      _ref2$initialSelectio = _ref2.initialSelections,
      initialSelections = _ref2$initialSelectio === void 0 ? [] : _ref2$initialSelectio,
      children = _ref2.children;

  /** Serialize config to track updates */
  var _serializedConfig = JSON.stringify(qlikConfig);
  /** Convert to array */


  var qlikConfigArray = (0, _react.useMemo)(function () {
    return Array.isArray(qlikConfig) ? qlikConfig : [qlikConfig];
  }, [_serializedConfig]);
  /** Sessions */

  var sessions = (0, _react.useMemo)(function () {
    return (
      /** For each qlik config.. */
      qlikConfigArray.map(function (config) {
        /** Create a new session id */
        var sessionId = (0, _v["default"])();
        /** Create a new QdtComponents instance */

        var qdtComponents = new _qdtComponents["default"](qdtConfigGenerator(config), {
          vizApi: true,
          engineApi: true,
          useUniqueSessionID: sessionId
        });
        /** Create a new RxQ session */

        var rxqSession = (0, _rxq.connectSession)(_objectSpread({}, config, {
          identity: sessionId
        }));
        var rxqGlobal$ = rxqSession.global$.pipe((0, _operators.shareReplay)(1));
        var rxqDoc$ = rxqGlobal$.pipe((0, _rxq.qAskReplay)("OpenDoc", config.appname));
        /** return the QdtComponent session and RxQ session for this config */

        return {
          name: config.name,
          app: config.appname,
          initialBookmark: config.initialBookmark,
          sessionId: sessionId,
          qdtComponents: qdtComponents,
          rxq: {
            session: rxqSession,
            global$: rxqGlobal$,
            doc$: rxqDoc$
          }
        };
      })
    );
  }, [_serializedConfig]);
  (0, _react.useEffect)(function () {
    var bookmark$ = (0, _rxjs.from)(sessions).pipe((0, _operators.mergeMap)(function (session) {
      return session.rxq.doc$.pipe((0, _rxq.qAskReplay)("ApplyBookmark", session.initialBookmark));
    })).subscribe(); // const sub$ = sessions[0].rxq.doc$
    //   .pipe(
    //     qAskReplay("CreateSessionObject", {
    //       qInfo: { qType: "currentselections" },
    //       currentSelections: {
    //         qStringExpression: "=GetCurrentSelections()"
    //       }
    //     }),
    //     invalidations(true),
    //     qAskReplay("GetLayout")
    //   )
    //   .subscribe(console.log);

    return function () {
      return bookmark$.unsubscribe();
    };
  }, [sessions]);
  /** Return Context Provider */

  return _react["default"].createElement(SessionContext.Provider, {
    value: sessions
  }, children);
};
/** Accessible context consumer */


exports.SessionProvider = SessionProvider;

var useSession = function useSession() {
  return (0, _react.useContext)(SessionContext);
};

exports.useSession = useSession;