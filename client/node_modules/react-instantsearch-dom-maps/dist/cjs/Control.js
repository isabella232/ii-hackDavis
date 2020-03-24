"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Control = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactInstantsearchDom = require("react-instantsearch-dom");

var _GeoSearchContext = _interopRequireDefault(require("./GeoSearchContext"));

var _withGoogleMaps = _interopRequireDefault(require("./withGoogleMaps"));

var cx = (0, _reactInstantsearchDom.createClassNames)('GeoSearch');
var ControlPropTypes = {
  googleMapsInstance: _propTypes.default.object.isRequired,
  translate: _propTypes.default.func.isRequired
};

var Control = function Control(_ref) {
  var googleMapsInstance = _ref.googleMapsInstance,
      translate = _ref.translate,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove = _ref.toggleRefineOnMapMove,
      refineWithInstance = _ref.refineWithInstance;
  return _react.default.createElement("div", {
    className: cx('control')
  }, isRefineOnMapMove || !hasMapMoveSinceLastRefine ? _react.default.createElement("label", {
    className: cx('label')
  }, _react.default.createElement("input", {
    className: cx('input'),
    type: "checkbox",
    checked: isRefineOnMapMove,
    onChange: toggleRefineOnMapMove
  }), translate('control')) : _react.default.createElement("button", {
    className: cx('redo'),
    onClick: function onClick() {
      return refineWithInstance(googleMapsInstance);
    }
  }, translate('redo')));
};

exports.Control = Control;
Control.propTypes = (0, _objectSpread2.default)({}, ControlPropTypes, {
  isRefineOnMapMove: _propTypes.default.bool.isRequired,
  toggleRefineOnMapMove: _propTypes.default.func.isRequired,
  hasMapMoveSinceLastRefine: _propTypes.default.bool.isRequired,
  refineWithInstance: _propTypes.default.func.isRequired
});

var ControlWrapper = function ControlWrapper(props) {
  return _react.default.createElement(_GeoSearchContext.default.Consumer, null, function (_ref2) {
    var isRefineOnMapMove = _ref2.isRefineOnMapMove,
        hasMapMoveSinceLastRefine = _ref2.hasMapMoveSinceLastRefine,
        toggleRefineOnMapMove = _ref2.toggleRefineOnMapMove,
        refineWithInstance = _ref2.refineWithInstance;
    return _react.default.createElement(Control, (0, _extends2.default)({}, props, {
      isRefineOnMapMove: isRefineOnMapMove,
      hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove: toggleRefineOnMapMove,
      refineWithInstance: refineWithInstance
    }));
  });
};

ControlWrapper.propTypes = ControlPropTypes;

var _default = (0, _reactInstantsearchDom.translatable)({
  control: 'Search as I move the map',
  redo: 'Redo search here'
})((0, _withGoogleMaps.default)(ControlWrapper));

exports.default = _default;