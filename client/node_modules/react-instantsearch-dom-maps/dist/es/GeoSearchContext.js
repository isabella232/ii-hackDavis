import React from 'react';
var GeoSearchContext = React.createContext({
  // The actual default value comes from the prop of the component
  // wrapping the `Provider`.
  isRefineOnMapMove: true,
  hasMapMoveSinceLastRefine: false,
  toggleRefineOnMapMove: function toggleRefineOnMapMove() {},
  setMapMoveSinceLastRefine: function setMapMoveSinceLastRefine() {},
  refineWithInstance: function refineWithInstance() {}
});
export default GeoSearchContext;