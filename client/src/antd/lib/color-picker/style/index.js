"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genActiveStyle = exports.default = void 0;
var _internal = require("../../theme/internal");
var _colorBlock = _interopRequireDefault(require("./color-block"));
var _input = _interopRequireDefault(require("./input"));
var _picker = _interopRequireDefault(require("./picker"));
var _presets = _interopRequireDefault(require("./presets"));
const genActiveStyle = token => ({
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.lineWidth,
  outline: 0
});
exports.genActiveStyle = genActiveStyle;
const genRtlStyle = token => {
  const {
    componentCls
  } = token;
  return {
    '&-rtl': {
      [`${componentCls}-presets-color`]: {
        '&::after': {
          direction: 'ltr'
        }
      },
      [`${componentCls}-clear`]: {
        '&::after': {
          direction: 'ltr'
        }
      }
    }
  };
};
const genClearStyle = (token, size) => {
  const {
    componentCls,
    borderRadiusSM,
    lineWidth,
    colorSplit,
    red6
  } = token;
  return {
    [`${componentCls}-clear`]: {
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${lineWidth}px solid ${colorSplit}`,
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        insetInlineEnd: lineWidth,
        top: 0,
        display: 'block',
        width: 40,
        height: 2,
        transformOrigin: 'right',
        transform: 'rotate(-45deg)',
        backgroundColor: red6
      }
    }
  };
};
const genColorPickerStyle = token => {
  const {
    componentCls,
    colorPickerWidth,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorBgContainerDisabled,
    borderRadius,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorBgTextActive,
    colorPickerPresetColorSize,
    lineWidth,
    colorBorder
  } = token;
  return [{
    [componentCls]: Object.assign({
      [`${componentCls}-panel`]: Object.assign(Object.assign(Object.assign(Object.assign({
        display: 'flex',
        flexDirection: 'column',
        width: colorPickerWidth,
        [`${componentCls}-inner-panel`]: {
          [`${componentCls}-clear`]: {
            marginInlineStart: 'auto',
            marginBottom: marginXS
          },
          '&-divider': {
            margin: `${marginSM}px 0 ${marginXS}px`
          }
        }
      }, (0, _picker.default)(token)), (0, _input.default)(token)), (0, _presets.default)(token)), genClearStyle(token, colorPickerPresetColorSize)),
      '&-trigger': Object.assign(Object.assign({
        width: controlHeight,
        height: controlHeight,
        borderRadius,
        border: `${lineWidth}px solid ${colorBorder}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `all ${motionDurationMid}`,
        background: colorBgElevated,
        '&-active': Object.assign(Object.assign({}, genActiveStyle(token)), {
          borderColor: colorPrimary
        }),
        '&:hover': {
          borderColor: colorPrimary
        },
        '&-disabled': {
          color: colorTextDisabled,
          background: colorBgContainerDisabled,
          cursor: 'not-allowed',
          '&:hover': {
            borderColor: colorBgTextActive
          }
        }
      }, genClearStyle(token, controlHeightSM)), (0, _colorBlock.default)(token, controlHeightSM))
    }, genRtlStyle(token))
  }];
};
var _default = (0, _internal.genComponentStyleHook)('ColorPicker', token => {
  const {
    colorTextQuaternary,
    marginSM
  } = token;
  const colorPickerSliderHeight = 8;
  const colorPickerToken = (0, _internal.mergeToken)(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 18,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: colorPickerSliderHeight * 2 + marginSM
  });
  return [genColorPickerStyle(colorPickerToken)];
});
exports.default = _default;