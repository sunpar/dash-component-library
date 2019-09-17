"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _context = require("../context");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_ref) {
  var type = _ref.type,
      app = _ref.app,
      qdtProps = _ref.qdtProps,
      className = _ref.className;
  var ref = (0, _react.useRef)();
  var sessions = (0, _context.useSession)();

  var _ref2 = app ? sessions.find(function (session) {
    return session.name === app;
  }) : sessions[0],
      qdtComponents = _ref2.qdtComponents;

  (0, _react.useEffect)(function () {
    qdtComponents.render(type, qdtProps, ref.current);
    return function () {
      return qdtComponents.unmountQdtComponent(ref.current);
    };
  }, [ref]);
  return _react["default"].createElement("div", {
    className: className,
    ref: ref
  });
};

exports["default"] = _default;