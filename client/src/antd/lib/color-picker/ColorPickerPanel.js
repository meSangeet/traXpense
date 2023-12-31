"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colorPicker = _interopRequireDefault(require("@rc-component/color-picker"));
var _react = _interopRequireDefault(require("react"));
var _divider = _interopRequireDefault(require("../divider"));
var _ColorClear = _interopRequireDefault(require("./components/ColorClear"));
var _ColorInput = _interopRequireDefault(require("./components/ColorInput"));
var _ColorPresets = _interopRequireDefault(require("./components/ColorPresets"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ColorPickerPanel = props => {
  const {
      prefixCls,
      allowClear,
      presets,
      onChange,
      onClear,
      onChangeComplete,
      color,
      colorCleared
    } = props,
    injectProps = __rest(props, ["prefixCls", "allowClear", "presets", "onChange", "onClear", "onChangeComplete", "color", "colorCleared"]);
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;
  const extraPanelRender = panel => /*#__PURE__*/_react.default.createElement("div", {
    className: colorPickerPanelPrefixCls
  }, allowClear && /*#__PURE__*/_react.default.createElement(_ColorClear.default, Object.assign({
    prefixCls: prefixCls,
    value: color,
    colorCleared: colorCleared,
    onChange: clearColor => {
      onChange === null || onChange === void 0 ? void 0 : onChange(clearColor);
      onClear === null || onClear === void 0 ? void 0 : onClear();
    }
  }, injectProps)), panel, /*#__PURE__*/_react.default.createElement(_ColorInput.default, Object.assign({
    value: color,
    onChange: onChange,
    prefixCls: prefixCls
  }, injectProps)), Array.isArray(presets) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_divider.default, {
    className: `${colorPickerPanelPrefixCls}-divider`
  }), /*#__PURE__*/_react.default.createElement(_ColorPresets.default, {
    value: color,
    presets: presets,
    prefixCls: prefixCls,
    onChange: onChange
  })));
  return /*#__PURE__*/_react.default.createElement(_colorPicker.default, {
    prefixCls: prefixCls,
    value: color === null || color === void 0 ? void 0 : color.toHsb(),
    onChange: (colorValue, type) => onChange === null || onChange === void 0 ? void 0 : onChange(colorValue, type, true),
    panelRender: extraPanelRender,
    onChangeComplete: onChangeComplete
  });
};
if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}
var _default = ColorPickerPanel;
exports.default = _default;