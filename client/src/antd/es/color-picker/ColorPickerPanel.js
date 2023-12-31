var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import RcColorPicker from '@rc-component/color-picker';
import React from 'react';
import Divider from '../divider';
import ColorClear from './components/ColorClear';
import ColorInput from './components/ColorInput';
import ColorPresets from './components/ColorPresets';
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
  const extraPanelRender = panel => /*#__PURE__*/React.createElement("div", {
    className: colorPickerPanelPrefixCls
  }, allowClear && /*#__PURE__*/React.createElement(ColorClear, Object.assign({
    prefixCls: prefixCls,
    value: color,
    colorCleared: colorCleared,
    onChange: clearColor => {
      onChange === null || onChange === void 0 ? void 0 : onChange(clearColor);
      onClear === null || onClear === void 0 ? void 0 : onClear();
    }
  }, injectProps)), panel, /*#__PURE__*/React.createElement(ColorInput, Object.assign({
    value: color,
    onChange: onChange,
    prefixCls: prefixCls
  }, injectProps)), Array.isArray(presets) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Divider, {
    className: `${colorPickerPanelPrefixCls}-divider`
  }), /*#__PURE__*/React.createElement(ColorPresets, {
    value: color,
    presets: presets,
    prefixCls: prefixCls,
    onChange: onChange
  })));
  return /*#__PURE__*/React.createElement(RcColorPicker, {
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
export default ColorPickerPanel;