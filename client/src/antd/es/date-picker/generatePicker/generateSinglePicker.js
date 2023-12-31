var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CalendarOutlined from "@ant-design/icons/es/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/es/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { Components, getTimeProps } from '.';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import warning from '../../_util/warning';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import useSize from '../../config-provider/hooks/useSize';
import { FormItemInputContext } from '../../form/context';
import { useLocale } from '../../locale';
import { useCompactItemContext } from '../../space/Compact';
import enUS from '../locale/en_US';
import useStyle from '../style';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
export default function generatePicker(generateConfig) {
  function getPicker(picker, displayName) {
    const Picker = /*#__PURE__*/forwardRef((props, ref) => {
      const {
          prefixCls: customizePrefixCls,
          getPopupContainer: customizeGetPopupContainer,
          className,
          rootClassName,
          size: customizeSize,
          bordered = true,
          placement,
          placeholder,
          popupClassName,
          dropdownClassName,
          disabled: customDisabled,
          status: customStatus
        } = props,
        restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "rootClassName", "size", "bordered", "placement", "placeholder", "popupClassName", "dropdownClassName", "disabled", "status"]);
      const {
        getPrefixCls,
        direction,
        getPopupContainer
      } = useContext(ConfigContext);
      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const {
        compactSize,
        compactItemClassnames
      } = useCompactItemContext(prefixCls, direction);
      const innerRef = React.useRef(null);
      const {
        format,
        showTime
      } = props;
      const [wrapSSR, hashId] = useStyle(prefixCls);
      useImperativeHandle(ref, () => ({
        focus: () => {
          var _a;
          return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        },
        blur: () => {
          var _a;
          return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
      }));
      const additionalProps = {
        showToday: true
      };
      let additionalOverrideProps = {};
      if (picker) {
        additionalOverrideProps.picker = picker;
      }
      const mergedPicker = picker || props.picker;
      additionalOverrideProps = Object.assign(Object.assign(Object.assign({}, additionalOverrideProps), showTime ? getTimeProps(Object.assign({
        format,
        picker: mergedPicker
      }, showTime)) : {}), mergedPicker === 'time' ? getTimeProps(Object.assign(Object.assign({
        format
      }, props), {
        picker: mergedPicker
      })) : {});
      const rootPrefixCls = getPrefixCls();
      // =================== Warning =====================
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== "production" ? warning(picker !== 'quarter', displayName, `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${picker}'] directly.`) : void 0;
        process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, displayName || 'DatePicker', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
      }
      // ===================== Size =====================
      const mergedSize = useSize(ctx => {
        var _a;
        return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
      });
      // ===================== Disabled =====================
      const disabled = React.useContext(DisabledContext);
      const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      // ===================== FormItemInput =====================
      const formItemContext = useContext(FormItemInputContext);
      const {
        hasFeedback,
        status: contextStatus,
        feedbackIcon
      } = formItemContext;
      const suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, mergedPicker === 'time' ? /*#__PURE__*/React.createElement(ClockCircleOutlined, null) : /*#__PURE__*/React.createElement(CalendarOutlined, null), hasFeedback && feedbackIcon);
      const [contextLocale] = useLocale('DatePicker', enUS);
      const locale = Object.assign(Object.assign({}, contextLocale), props.locale);
      return wrapSSR( /*#__PURE__*/React.createElement(RCPicker, Object.assign({
        ref: innerRef,
        placeholder: getPlaceholder(locale, mergedPicker, placeholder),
        suffixIcon: suffixNode,
        dropdownAlign: transPlacement2DropdownAlign(direction, placement),
        clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null),
        prevIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-prev-icon`
        }),
        nextIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-next-icon`
        }),
        superPrevIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-super-prev-icon`
        }),
        superNextIcon: /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-super-next-icon`
        }),
        allowClear: true,
        transitionName: `${rootPrefixCls}-slide-up`
      }, additionalProps, restProps, additionalOverrideProps, {
        locale: locale.lang,
        className: classNames({
          [`${prefixCls}-${mergedSize}`]: mergedSize,
          [`${prefixCls}-borderless`]: !bordered
        }, getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className, rootClassName),
        prefixCls: prefixCls,
        getPopupContainer: customizeGetPopupContainer || getPopupContainer,
        generateConfig: generateConfig,
        components: Components,
        direction: direction,
        disabled: mergedDisabled,
        dropdownClassName: classNames(hashId, rootClassName, popupClassName || dropdownClassName)
      })));
    });
    if (displayName) {
      Picker.displayName = displayName;
    }
    return Picker;
  }
  const DatePicker = getPicker();
  const WeekPicker = getPicker('week', 'WeekPicker');
  const MonthPicker = getPicker('month', 'MonthPicker');
  const YearPicker = getPicker('year', 'YearPicker');
  const TimePicker = getPicker('time', 'TimePicker');
  const QuarterPicker = getPicker('quarter', 'QuarterPicker');
  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker
  };
}