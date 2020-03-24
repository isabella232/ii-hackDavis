import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React from 'react';
import PropTypes from 'prop-types';
import { createClassNames, translatable } from 'react-instantsearch-dom';
import GeoSearchContext from './GeoSearchContext';
import withGoogleMaps from './withGoogleMaps';
var cx = createClassNames('GeoSearch');
var RedoPropTypes = {
  googleMapsInstance: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired
};
export var Redo = function Redo(_ref) {
  var googleMapsInstance = _ref.googleMapsInstance,
      translate = _ref.translate,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      refineWithInstance = _ref.refineWithInstance;
  return React.createElement("div", {
    className: cx('control')
  }, React.createElement("button", {
    className: cx('redo', !hasMapMoveSinceLastRefine && 'redo--disabled'),
    disabled: !hasMapMoveSinceLastRefine,
    onClick: function onClick() {
      return refineWithInstance(googleMapsInstance);
    }
  }, translate('redo')));
};
Redo.propTypes = _objectSpread({}, RedoPropTypes, {
  hasMapMoveSinceLastRefine: PropTypes.bool.isRequired,
  refineWithInstance: PropTypes.func.isRequired
});

var RedoWrapper = function RedoWrapper(props) {
  return React.createElement(GeoSearchContext.Consumer, null, function (_ref2) {
    var hasMapMoveSinceLastRefine = _ref2.hasMapMoveSinceLastRefine,
        refineWithInstance = _ref2.refineWithInstance;
    return React.createElement(Redo, _extends({}, props, {
      hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
      refineWithInstance: refineWithInstance
    }));
  });
};

RedoWrapper.propTypes = RedoPropTypes;
export default translatable({
  redo: 'Redo search here'
})(withGoogleMaps(RedoWrapper));