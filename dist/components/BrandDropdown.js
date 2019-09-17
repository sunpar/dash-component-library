"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _context = require("../context");

var _rxq = require("rxq");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reactJss = require("react-jss");

var _classnames = _interopRequireDefault(require("classnames"));

var _ = require(".");

var brandImages = _interopRequireWildcard(require("../resources/images/brands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  brandDropdown: {
    marginRight: "10px"
  },
  brandDropdown__container: {
    position: "absolute",
    padding: "20px 20px 30px",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#343a40",
    zIndex: 10
  },
  brandDropdown__input: {
    width: "90px",
    height: "50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "140%",
    backgroundPosition: "center",
    backgroundColor: "transparent",
    border: "none",
    opacity: 0.3,
    cursor: "pointer",
    "&:hover": {
      opacity: 1
    }
  },
  brandDropdown__input_selected: {
    opacity: 1
  }
};

var _default = (0, _reactJss.withStyles)(styles)(function (_ref) {
  var DropdownButton = _ref.DropdownButton,
      field = _ref.field,
      classes = _ref.classes;
  var doc$ = (0, _context.useSession)()[0].rxq.doc$;
  /** Get brand list */

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      brandList = _useState2[0],
      setBrandList = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      currentSelection = _useState4[0],
      setCurrentSelection = _useState4[1];

  var selectBrand$ = (0, _react.useRef)(new _rxjs.Subject()).current;
  (0, _react.useEffect)(function () {
    var brandListObj$ = doc$.pipe((0, _rxq.qAskReplay)("CreateSessionObject", {
      qInfo: {
        qType: "listobject"
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: [field]
        },
        qInitialDataFetch: [{
          qWidth: 1,
          qHeight: 100
        }]
      }
    }));
    var brandLayout$ = brandListObj$.pipe((0, _rxq.invalidations)(true), (0, _rxq.qAskReplay)("GetLayout"), (0, _operators.map)(function (layout) {
      return layout.qListObject.qDataPages[0].qMatrix;
    }), (0, _operators.map)(function (qMatrix) {
      return qMatrix.map(function (row) {
        return {
          code: row[0].qText,
          elemNumber: row[0].qElemNumber,
          selectionState: row[0].qState
        };
      });
    }), (0, _operators.tap)(function (brandList) {
      var selectedBrand = brandList.find(function (brand) {
        return brand.selectionState === "S";
      });
      if (selectedBrand !== undefined) setCurrentSelection(selectedBrand.code);else setCurrentSelection(null);
    })).subscribe(setBrandList);
    var selectionSub$ = selectBrand$.pipe((0, _operators.withLatestFrom)(brandListObj$), (0, _operators.switchMap)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          brand = _ref3[0],
          brandListObjHandle = _ref3[1];

      return brandListObjHandle.ask("SelectListObjectValues", "/qListObjectDef", [brand], false);
    })).subscribe();
    return function () {
      brandLayout$.unsubscribe();
      selectionSub$.unsubscribe();
    };
  }, [doc$, selectBrand$]);
  return _react["default"].createElement(_.Dropdown, {
    DropdownButton: DropdownButton,
    dropdownButtonChildren: "Brand".concat(currentSelection !== null ? ": ".concat(currentSelection) : ""),
    className: classes.brandDropdown
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(classes.brandDropdown__container)
  }, brandList.map(function (brand) {
    return _react["default"].createElement("input", {
      type: "button",
      key: brand.elemNumber,
      className: (0, _classnames["default"])(classes.brandDropdown__input, _defineProperty({}, classes.brandDropdown__input_selected, brand.selectionState === "S")),
      style: {
        backgroundImage: "url(".concat(brandImages[brand.code], ")")
      },
      onClick: function onClick() {
        return selectBrand$.next(brand.elemNumber);
      }
    });
  })));
});

exports["default"] = _default;