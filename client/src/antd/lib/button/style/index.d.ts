import type { FullToken } from '../../theme/internal';
/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
}
export interface ButtonToken extends FullToken<'Button'> {
    colorOutlineDefault: string;
    buttonPaddingHorizontal: number;
    buttonIconOnlyFontSize: number;
    buttonFontWeight: number;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
