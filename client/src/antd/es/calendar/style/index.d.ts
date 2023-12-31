import type { CSSObject } from '@ant-design/cssinjs';
import type { PickerPanelToken } from '../../date-picker/style';
import type { InputToken } from '../../input/style';
import type { FullToken } from '../../theme/internal';
export interface ComponentToken {
    yearControlWidth: number;
    monthControlWidth: number;
    miniContentHeight: number;
    fullBg: string;
    fullPanelBg: string;
    itemActiveBg: string;
}
interface CalendarToken extends InputToken<FullToken<'Calendar'>>, PickerPanelToken {
    calendarCls: string;
    dateValueHeight: number;
    weekHeight: number;
    dateContentHeight: number;
}
export declare const genCalendarStyles: (token: CalendarToken) => CSSObject;
declare const _default: (prefixCls: string) => import("../../theme/internal").UseComponentStyleResult;
export default _default;
