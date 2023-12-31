import type { CSSProperties, MouseEventHandler } from 'react';
import React from 'react';
import type { ColorPickerBaseProps } from '../interface';
interface colorTriggerProps extends Pick<ColorPickerBaseProps, 'prefixCls' | 'colorCleared' | 'disabled'> {
    color: Exclude<ColorPickerBaseProps['color'], undefined>;
    open?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}
declare const ColorTrigger: React.ForwardRefExoticComponent<colorTriggerProps & React.RefAttributes<HTMLDivElement>>;
export default ColorTrigger;
