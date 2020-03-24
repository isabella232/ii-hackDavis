import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import GoogleMapsContext from './GoogleMapsContext';

var withGoogleMaps = function withGoogleMaps(Wrapped) {
  var WithGoogleMaps = function WithGoogleMaps(props) {
    return React.createElement(GoogleMapsContext.Consumer, null, function (_ref) {
      var google = _ref.google,
          instance = _ref.instance;
      return React.createElement(Wrapped // @TODO: remove the cast once TypeScript fixes the issue
      // https://github.com/Microsoft/TypeScript/issues/28938
      , _extends({}, props, {
        google: google,
        googleMapsInstance: instance
      }));
    });
  };

  return WithGoogleMaps;
};

export default withGoogleMaps;