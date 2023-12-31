import type { CSSProperties } from 'react';
import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    descriptionMaxWidth: number;
    customIconSize: number;
    customIconTop: number;
    customIconFontSize: number;
    iconSize: number;
    iconTop: number;
    iconFontSize: number;
    dotSize: number;
    dotCurrentSize: number;
    navArrowColor: string;
    navContentMaxWidth: CSSProperties['maxWidth'];
    iconSizeSM: number;
    titleLineHeight: number;
}
export interface StepsToken extends FullToken<'Steps'> {
    processTailColor: string;
    processIconColor: string;
    processTitleColor: string;
    processDescriptionColor: string;
    processIconBgColor: string;
    processIconBorderColor: string;
    processDotColor: string;
    waitIconColor: string;
    waitTitleColor: string;
    waitDescriptionColor: string;
    waitTailColor: string;
    waitIconBgColor: string;
    waitIconBorderColor: string;
    waitDotColor: string;
    finishIconColor: string;
    finishTitleColor: string;
    finishDescriptionColor: string;
    finishTailColor: string;
    finishIconBgColor: string;
    finishIconBorderColor: string;
    finishDotColor: string;
    errorIconColor: string;
    errorTitleColor: string;
    errorDescriptionColor: string;
    errorTailColor: string;
    errorIconBgColor: string;
    errorIconBorderColor: string;
    errorDotColor: string;
    stepsNavActiveColor: string;
    stepsProgressSize: number;
    inlineDotSize: number;
    inlineTitleColor: string;
    inlineTailColor: string;
}
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
