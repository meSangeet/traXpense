import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Checkbox from './Checkbox';
import useStyle from './style';
export const GroupContext = /*#__PURE__*/React.createContext(null);
const InternalCheckboxGroup = (_a, ref) => {
  var {
      defaultValue,
      children,
      options = [],
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      onChange
    } = _a,
    restProps = __rest(_a, ["defaultValue", "children", "options", "prefixCls", "className", "rootClassName", "style", "onChange"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const [value, setValue] = React.useState(restProps.value || defaultValue || []);
  const [registeredValues, setRegisteredValues] = React.useState([]);
  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);
  const getOptions = () => options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: option,
        value: option
      };
    }
    return option;
  });
  const cancelValue = val => {
    setRegisteredValues(prevValues => prevValues.filter(v => v !== val));
  };
  const registerValue = val => {
    setRegisteredValues(prevValues => [].concat(_toConsumableArray(prevValues), [val]));
  };
  const toggleOption = option => {
    const optionIndex = value.indexOf(option.value);
    const newValue = _toConsumableArray(value);
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!('value' in restProps)) {
      setValue(newValue);
    }
    const opts = getOptions();
    onChange === null || onChange === void 0 ? void 0 : onChange(newValue.filter(val => registeredValues.includes(val)).sort((a, b) => {
      const indexA = opts.findIndex(opt => opt.value === a);
      const indexB = opts.findIndex(opt => opt.value === b);
      return indexA - indexB;
    }));
  };
  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const domProps = omit(restProps, ['value', 'disabled']);
  if (options && options.length > 0) {
    children = getOptions().map(option => /*#__PURE__*/React.createElement(Checkbox, {
      prefixCls: prefixCls,
      key: option.value.toString(),
      disabled: 'disabled' in option ? option.disabled : restProps.disabled,
      value: option.value,
      checked: value.includes(option.value),
      onChange: option.onChange,
      className: `${groupPrefixCls}-item`,
      style: option.style,
      title: option.title
    }, option.label));
  }
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue,
    cancelValue
  };
  const classString = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement("div", Object.assign({
    className: classString,
    style: style
  }, domProps, {
    ref: ref
  }), /*#__PURE__*/React.createElement(GroupContext.Provider, {
    value: context
  }, children)));
};
const CheckboxGroup = /*#__PURE__*/React.forwardRef(InternalCheckboxGroup);
export default /*#__PURE__*/React.memo(CheckboxGroup);