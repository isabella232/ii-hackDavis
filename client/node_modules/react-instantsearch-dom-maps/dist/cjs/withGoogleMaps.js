"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _GoogleMapsContext = _interopRequireDefault(require("./GoogleMapsContext"));

var withGoogleMaps = function withGoogleMaps(Wrapped) {
  var WithGoogleMaps = function WithGoogleMaps(props) {
    return _react.default.createElement(_GoogleMapsContext.default.Consumer, null, function (_ref) {
      var google = _ref.google,
          instance = _ref.instance;
      return _react.default.createElement(Wrapped // @TODO: remove the cast once TypeScript fixes the issue
      // https://github.com/Microsoft/TypeScript/issues/28938
      , (0, _extends2.default)({}, props, {
        google: google,
        googleMapsInstance: instance
      }));
    });
  };

  return WithGoogleMaps;
};

var _default = withGoogleMaps;
exports.default = _default;