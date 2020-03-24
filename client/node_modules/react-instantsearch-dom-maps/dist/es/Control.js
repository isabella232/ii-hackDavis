import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React from 'react';
import PropTypes from 'prop-types';
import { createClassNames, translatable } from 'react-instantsearch-dom';
import GeoSearchContext from './GeoSearchContext';
import withGoogleMaps from './withGoogleMaps';
var cx = createClassNames('GeoSearch');
var ControlPropTypes = {
  googleMapsInstance: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired
};
export var Control = function Control(_ref) {
  var googleMapsInstance = _ref.googleMapsInstance,
      translate = _ref.translate,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove = _ref.toggleRefineOnMapMove,
      refineWithInstance = _ref.refineWithInstance;
  return React.createElement("div", {
    className: cx('control')
  }, isRefineOnMapMove || !hasMapMoveSinceLastRefine ? React.createElement("label", {
    className: cx('label')
  }, React.createElement("input", {
    className: cx('input'),
    type: "checkbox",
    checked: isRefineOnMapMove,
    onChange: toggleRefineOnMapMove
  }), translate('control')) : React.createElement("button", {
    className: cx('redo'),
    onClick: function onClick() {
      return refineWithInstance(googleMapsInstance);
    }
  }, translate('redo')));
};
Control.propTypes = _objectSpread({}, ControlPropTypes, {
  isRefineOnMapMove: PropTypes.bool.isRequired,
  toggleRefineOnMapMove: PropTypes.func.isRequired,
  hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
  refineWithInstance: PropTypes.func.isRequired
});

var ControlWrapper = function ControlWrapper(props) {
  return React.createElement(GeoSearchContext.Consumer, null, function (_ref2) {
    var isRefineOnMapMove = _ref2.isRefineOnMapMove,
        hasMapMoveSinceLastRefine = _ref2.hasMapMoveSinceLastRefine,
        toggleRefineOnMapMove = _ref2.toggleRefineOnMapMove,
        refineWithInstance = _ref2.refineWithInstance;
    return React.createElement(Control, _extends({}, props, {
      isRefineOnMapMove: isRefineOnMapMove,
      hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove: toggleRefineOnMapMove,
      refineWithInstance: refineWithInstance
    }));
  });
};

ControlWrapper.propTypes = ControlPropTypes;
export default translatable({
  control: 'Search as I move the map',
  redo: 'Redo search here'
})(withGoogleMaps(ControlWrapper));