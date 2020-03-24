"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var GeoSearchContext = _react.default.createContext({
  // The actual default value comes from the prop of the component
  // wrapping the `Provider`.
  isRefineOnMapMove: true,
  hasMapMoveSinceLastRefine: false,
  toggleRefineOnMapMove: function toggleRefineOnMapMove() {},
  setMapMoveSinceLastRefine: function setMapMoveSinceLastRefine() {},
  refineWithInstance: function refineWithInstance() {}
});

var _default = GeoSearchContext;
exports.default = _default;