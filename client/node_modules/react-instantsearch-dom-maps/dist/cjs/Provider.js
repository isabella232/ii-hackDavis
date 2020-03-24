"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propTypes2 = require("./propTypes");

var _GeoSearchContext = _interopRequireDefault(require("./GeoSearchContext"));

var Provider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Provider, _Component);

  function Provider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Provider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Provider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isPendingRefine", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "boundingBox", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "previousBoundingBox", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "refineWithInstance", function (instance) {
      var refine = _this.props.refine;
      var bounds = instance.getBounds();
      refine({
        northEast: bounds.getNorthEast().toJSON(),
        southWest: bounds.getSouthWest().toJSON()
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "mapValue", {
      isRefineOnMapMove: _this.props.isRefineOnMapMove,
      hasMapMoveSinceLastRefine: _this.props.hasMapMoveSinceLastRefine,
      toggleRefineOnMapMove: _this.props.toggleRefineOnMapMove,
      setMapMoveSinceLastRefine: _this.props.setMapMoveSinceLastRefine,
      refineWithInstance: _this.refineWithInstance
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getMapValue", function () {
      var haveContextValuesChanges = _this.mapValue.isRefineOnMapMove !== _this.props.isRefineOnMapMove || _this.mapValue.hasMapMoveSinceLastRefine !== _this.props.hasMapMoveSinceLastRefine;

      if (haveContextValuesChanges) {
        _this.mapValue = (0, _objectSpread2.default)({}, _this.mapValue, {
          isRefineOnMapMove: _this.props.isRefineOnMapMove,
          hasMapMoveSinceLastRefine: _this.props.hasMapMoveSinceLastRefine
        });
      }

      return _this.mapValue;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function () {
      var _this$props = _this.props,
          isRefineOnMapMove = _this$props.isRefineOnMapMove,
          isRefineEnable = _this$props.isRefineEnable,
          setMapMoveSinceLastRefine = _this$props.setMapMoveSinceLastRefine;

      if (isRefineEnable) {
        setMapMoveSinceLastRefine(true);

        if (isRefineOnMapMove) {
          _this.isPendingRefine = true;
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onIdle", function (_ref) {
      var instance = _ref.instance;

      if (_this.isPendingRefine) {
        _this.isPendingRefine = false;

        _this.refineWithInstance(instance);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "shouldUpdate", function () {
      var hasMapMoveSinceLastRefine = _this.props.hasMapMoveSinceLastRefine;
      return !_this.isPendingRefine && !hasMapMoveSinceLastRefine;
    });
    return _this;
  }

  (0, _createClass2.default)(Provider, [{
    key: "createBoundingBoxFromHits",
    value: function createBoundingBoxFromHits(hits) {
      var google = this.props.google;
      var latLngBounds = hits.reduce(function (acc, hit) {
        return acc.extend(hit._geoloc);
      }, new google.maps.LatLngBounds());
      return {
        northEast: latLngBounds.getNorthEast().toJSON(),
        southWest: latLngBounds.getSouthWest().toJSON()
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          hits = _this$props2.hits,
          currentRefinement = _this$props2.currentRefinement,
          children = _this$props2.children; // We use this value for differentiate the padding to apply during
      // fitBounds. When we don't have a currenRefinement (boundingBox)
      // we let GoogleMaps compute the automatic padding. But when we
      // provide the currentRefinement we explicitly set the padding
      // to `0` otherwise the map will decrease the zoom on each refine.

      var boundingBoxPadding = !currentRefinement ? undefined : 0;
      var boundingBox = !currentRefinement && Boolean(hits.length) ? this.createBoundingBoxFromHits(hits) : currentRefinement;
      return _react.default.createElement(_GeoSearchContext.default.Provider, {
        value: this.getMapValue()
      }, children({
        onChange: this.onChange,
        onIdle: this.onIdle,
        shouldUpdate: this.shouldUpdate,
        boundingBox: boundingBox,
        boundingBoxPadding: boundingBoxPadding
      }));
    }
  }]);
  return Provider;
}(_react.Component);

(0, _defineProperty2.default)(Provider, "propTypes", {
  google: _propTypes.default.object.isRequired,
  hits: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  isRefineOnMapMove: _propTypes.default.bool.isRequired,
  hasMapMoveSinceLastRefine: _propTypes.default.bool.isRequired,
  isRefineEnable: _propTypes.default.bool.isRequired,
  refine: _propTypes.default.func.isRequired,
  toggleRefineOnMapMove: _propTypes.default.func.isRequired,
  setMapMoveSinceLastRefine: _propTypes.default.func.isRequired,
  children: _propTypes.default.func.isRequired,
  position: _propTypes2.LatLngPropType,
  currentRefinement: _propTypes2.BoundingBoxPropType
});
var _default = Provider;
exports.default = _default;