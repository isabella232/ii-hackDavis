"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Redo = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactInstantsearchDom = require("react-instantsearch-dom");

var _GeoSearchContext = _interopRequireDefault(require("./GeoSearchContext"));

var _withGoogleMaps = _interopRequireDefault(require("./withGoogleMaps"));

var cx = (0, _reactInstantsearchDom.createClassNames)('GeoSearch');
var RedoPropTypes = {
  googleMapsInstance: _propTypes.default.object.isRequired,
  translate: _propTypes.default.func.isRequired
};

var Redo = function Redo(_ref) {
  var googleMapsInstance = _ref.googleMapsInstance,
      translate = _ref.translate,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      refineWithInstance = _ref.refineWithInstance;
  return _react.default.createElement("div", {
    className: cx('control')
  }, _react.default.createElement("button", {
    className: cx('redo', !hasMapMoveSinceLastRefine && 'redo--disabled'),
    disabled: !hasMapMoveSinceLastRefine,
    onClick: function onClick() {
      return refineWithInstance(googleMapsInstance);
    }
  }, translate('redo')));
};

exports.Redo = Redo;
Redo.propTypes = (0, _objectSpread2.default)({}, RedoPropTypes, {
  hasMapMoveSinceLastRefine: _propTypes.default.bool.isRequired,
  refineWithInstance: _propTypes.default.func.isRequired
});

var RedoWrapper = function RedoWrapper(props) {
  return _react.default.createElement(_GeoSearchContext.default.Consumer, null, function (_ref2) {
    var hasMapMoveSinceLastRefine = _ref2.hasMapMoveSinceLastRefine,
        refineWithInstance = _ref2.refineWithInstance;
    return _react.default.createElement(Redo, (0, _extends2.default)({}, props, {
      hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
      refineWithInstance: refineWithInstance
    }));
  });
};

RedoWrapper.propTypes = RedoPropTypes;

var _default = (0, _reactInstantsearchDom.translatable)({
  redo: 'Redo search here'
})((0, _withGoogleMaps.default)(RedoWrapper));

exports.default = _default;