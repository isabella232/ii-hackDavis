"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var GoogleMapsContext = _react.default.createContext({
  // We mount the context only once the map is created. Thus, we can assume
  // that the value provided through the context is never `undefined`. We can't
  // create an instance at that point, hence the cast.
  google: {},
  instance: {}
});

var _default = GoogleMapsContext;
exports.default = _default;