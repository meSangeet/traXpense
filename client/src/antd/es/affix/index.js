import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import omit from "rc-util/es/omit";
import React, { createRef, forwardRef, useContext } from 'react';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { getFixedBottom, getFixedTop, getTargetRect } from './utils';
const TRIGGER_EVENTS = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
var AffixStatus;
(function (AffixStatus) {
  AffixStatus[AffixStatus["None"] = 0] = "None";
  AffixStatus[AffixStatus["Prepare"] = 1] = "Prepare";
})(AffixStatus || (AffixStatus = {}));
let InternalAffix = /*#__PURE__*/function (_React$Component) {
  _inherits(InternalAffix, _React$Component);
  var _super = _createSuper(InternalAffix);
  function InternalAffix() {
    var _this;
    _classCallCheck(this, InternalAffix);
    _this = _super.apply(this, arguments);
    _this.state = {
      status: AffixStatus.None,
      lastAffix: false,
      prevTarget: null
    };
    _this.placeholderNodeRef = /*#__PURE__*/createRef();
    _this.fixedNodeRef = /*#__PURE__*/createRef();
    _this.addListeners = () => {
      const targetFunc = _this.getTargetFunc();
      const target = targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc();
      const {
        prevTarget
      } = _this.state;
      if (prevTarget !== target) {
        TRIGGER_EVENTS.forEach(eventName => {
          prevTarget === null || prevTarget === void 0 ? void 0 : prevTarget.removeEventListener(eventName, _this.lazyUpdatePosition);
          target === null || target === void 0 ? void 0 : target.addEventListener(eventName, _this.lazyUpdatePosition);
        });
        _this.updatePosition();
        _this.setState({
          prevTarget: target
        });
      }
    };
    _this.removeListeners = () => {
      if (_this.timer) {
        clearTimeout(_this.timer);
        _this.timer = null;
      }
      const {
        prevTarget
      } = _this.state;
      const targetFunc = _this.getTargetFunc();
      const newTarget = targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc();
      TRIGGER_EVENTS.forEach(eventName => {
        newTarget === null || newTarget === void 0 ? void 0 : newTarget.removeEventListener(eventName, _this.lazyUpdatePosition);
        prevTarget === null || prevTarget === void 0 ? void 0 : prevTarget.removeEventListener(eventName, _this.lazyUpdatePosition);
      });
      _this.updatePosition.cancel();
      // https://github.com/ant-design/ant-design/issues/22683
      _this.lazyUpdatePosition.cancel();
    };
    _this.getOffsetTop = () => {
      const {
        offsetBottom,
        offsetTop
      } = _this.props;
      return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
    };
    _this.getOffsetBottom = () => _this.props.offsetBottom;
    // =================== Measure ===================
    _this.measure = () => {
      const {
        status,
        lastAffix
      } = _this.state;
      const {
        onChange
      } = _this.props;
      const targetFunc = _this.getTargetFunc();
      if (status !== AffixStatus.Prepare || !_this.fixedNodeRef.current || !_this.placeholderNodeRef.current || !targetFunc) {
        return;
      }
      const offsetTop = _this.getOffsetTop();
      const offsetBottom = _this.getOffsetBottom();
      const targetNode = targetFunc();
      if (targetNode) {
        const newState = {
          status: AffixStatus.None
        };
        const placeholderRect = getTargetRect(_this.placeholderNodeRef.current);
        if (placeholderRect.top === 0 && placeholderRect.left === 0 && placeholderRect.width === 0 && placeholderRect.height === 0) {
          return;
        }
        const targetRect = getTargetRect(targetNode);
        const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);
        if (fixedTop !== undefined) {
          newState.affixStyle = {
            position: 'fixed',
            top: fixedTop,
            width: placeholderRect.width,
            height: placeholderRect.height
          };
          newState.placeholderStyle = {
            width: placeholderRect.width,
            height: placeholderRect.height
          };
        } else if (fixedBottom !== undefined) {
          newState.affixStyle = {
            position: 'fixed',
            bottom: fixedBottom,
            width: placeholderRect.width,
            height: placeholderRect.height
          };
          newState.placeholderStyle = {
            width: placeholderRect.width,
            height: placeholderRect.height
          };
        }
        newState.lastAffix = !!newState.affixStyle;
        if (onChange && lastAffix !== newState.lastAffix) {
          onChange(newState.lastAffix);
        }
        _this.setState(newState);
      }
    };
    _this.prepareMeasure = () => {
      // event param is used before. Keep compatible ts define here.
      _this.setState({
        status: AffixStatus.Prepare,
        affixStyle: undefined,
        placeholderStyle: undefined
      });
      // Test if `updatePosition` called
      if (process.env.NODE_ENV === 'test') {
        const {
          onTestUpdatePosition
        } = _this.props;
        onTestUpdatePosition === null || onTestUpdatePosition === void 0 ? void 0 : onTestUpdatePosition();
      }
    };
    _this.updatePosition = throttleByAnimationFrame(() => {
      _this.prepareMeasure();
    });
    _this.lazyUpdatePosition = throttleByAnimationFrame(() => {
      const targetFunc = _this.getTargetFunc();
      const {
        affixStyle
      } = _this.state;
      // Check position change before measure to make Safari smooth
      if (targetFunc && affixStyle) {
        const offsetTop = _this.getOffsetTop();
        const offsetBottom = _this.getOffsetBottom();
        const targetNode = targetFunc();
        if (targetNode && _this.placeholderNodeRef.current) {
          const targetRect = getTargetRect(targetNode);
          const placeholderRect = getTargetRect(_this.placeholderNodeRef.current);
          const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
          const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);
          if (fixedTop !== undefined && affixStyle.top === fixedTop || fixedBottom !== undefined && affixStyle.bottom === fixedBottom) {
            return;
          }
        }
      }
      // Directly call prepare measure since it's already throttled.
      _this.prepareMeasure();
    });
    return _this;
  }
  _createClass(InternalAffix, [{
    key: "getTargetFunc",
    value: function getTargetFunc() {
      const {
        getTargetContainer
      } = this.context;
      const {
        target
      } = this.props;
      if (target !== undefined) {
        return target;
      }
      return getTargetContainer !== null && getTargetContainer !== void 0 ? getTargetContainer : getDefaultTarget;
    }
    // Event handler
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      this.timer = setTimeout(this.addListeners);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.addListeners();
      if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
        this.updatePosition();
      }
      this.measure();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListeners();
    }
    // =================== Render ===================
  }, {
    key: "render",
    value: function render() {
      const {
        affixStyle,
        placeholderStyle
      } = this.state;
      const {
        affixPrefixCls,
        rootClassName,
        children
      } = this.props;
      const className = classNames(affixStyle && rootClassName, {
        [affixPrefixCls]: !!affixStyle
      });
      let props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'affixPrefixCls', 'rootClassName']);
      // Omit this since `onTestUpdatePosition` only works on test.
      if (process.env.NODE_ENV === 'test') {
        props = omit(props, ['onTestUpdatePosition']);
      }
      return /*#__PURE__*/React.createElement(ResizeObserver, {
        onResize: this.updatePosition
      }, /*#__PURE__*/React.createElement("div", Object.assign({}, props, {
        ref: this.placeholderNodeRef
      }), affixStyle && /*#__PURE__*/React.createElement("div", {
        style: placeholderStyle,
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("div", {
        className: className,
        ref: this.fixedNodeRef,
        style: affixStyle
      }, /*#__PURE__*/React.createElement(ResizeObserver, {
        onResize: this.updatePosition
      }, children))));
    }
  }]);
  return InternalAffix;
}(React.Component);
InternalAffix.contextType = ConfigContext;
const Affix = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName
  } = props;
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const affixPrefixCls = getPrefixCls('affix', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(affixPrefixCls);
  const AffixProps = Object.assign(Object.assign({}, props), {
    affixPrefixCls,
    rootClassName: classNames(rootClassName, hashId)
  });
  return wrapSSR( /*#__PURE__*/React.createElement(InternalAffix, Object.assign({}, AffixProps, {
    ref: ref
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Affix.displayName = 'Affix';
}
export default Affix;