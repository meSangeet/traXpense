import type { BaseOptionType, DefaultOptionType, FieldNames, MultipleCascaderProps as RcMultipleCascaderProps, SingleCascaderProps as RcSingleCascaderProps } from 'rc-cascader';
import * as React from 'react';
import type { SelectCommonPlacement } from '../_util/motion';
import type { InputStatus } from '../_util/statusUtils';
import type { SizeType } from '../config-provider/SizeContext';
export { BaseOptionType, DefaultOptionType };
export type FieldNamesType = FieldNames;
export type FilledFieldNamesType = Required<FieldNamesType>;
declare const SHOW_CHILD: "SHOW_CHILD", SHOW_PARENT: "SHOW_PARENT";
type SingleCascaderProps<OptionType extends BaseOptionType> = Omit<RcSingleCascaderProps<OptionType>, 'checkable' | 'options'> & {
    multiple?: false;
};
type MultipleCascaderProps<OptionType extends BaseOptionType> = Omit<RcMultipleCascaderProps<OptionType>, 'checkable' | 'options'> & {
    multiple: true;
};
type UnionCascaderProps<OptionType extends BaseOptionType> = SingleCascaderProps<OptionType> | MultipleCascaderProps<OptionType>;
export type CascaderProps<DataNodeType extends BaseOptionType = any> = UnionCascaderProps<DataNodeType> & {
    multiple?: boolean;
    size?: SizeType;
    disabled?: boolean;
    bordered?: boolean;
    placement?: SelectCommonPlacement;
    suffixIcon?: React.ReactNode;
    options?: DataNodeType[];
    status?: InputStatus;
    rootClassName?: string;
    popupClassName?: string;
    /** @deprecated Please use `popupClassName` instead */
    dropdownClassName?: string;
};
export interface CascaderRef {
    focus: () => void;
    blur: () => void;
}
declare const Cascader: (<OptionType extends DefaultOptionType | BaseOptionType = DefaultOptionType>(props: React.PropsWithChildren<CascaderProps<OptionType>> & {
    ref?: React.Ref<CascaderRef> | undefined;
}) => React.ReactElement) & {
    displayName: string;
    SHOW_PARENT: typeof SHOW_PARENT;
    SHOW_CHILD: typeof SHOW_CHILD;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
declare const PurePanel: any;
export default Cascader;
