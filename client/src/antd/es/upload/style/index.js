import { resetComponent } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genDraggerStyle from './dragger';
import genListStyle from './list';
import genMotionStyle from './motion';
import { genPictureCardStyle, genPictureStyle } from './picture';
import genRtlStyle from './rtl';
const genBaseStyle = token => {
  const {
    componentCls,
    colorTextDisabled
  } = token;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      [componentCls]: {
        outline: 0,
        "input[type='file']": {
          cursor: 'pointer'
        }
      },
      [`${componentCls}-select`]: {
        display: 'inline-block'
      },
      [`${componentCls}-disabled`]: {
        color: colorTextDisabled,
        cursor: 'not-allowed'
      }
    })
  };
};
// ============================== Export ==============================
export default genComponentStyleHook('Upload', token => {
  const {
    fontSizeHeading3,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightLG
  } = token;
  const listItemHeightSM = Math.round(fontSize * lineHeight);
  const uploadToken = mergeToken(token, {
    uploadThumbnailSize: fontSizeHeading3 * 2,
    uploadProgressOffset: listItemHeightSM / 2 + lineWidth,
    uploadPicCardSize: controlHeightLG * 2.55
  });
  return [genBaseStyle(uploadToken), genDraggerStyle(uploadToken), genPictureStyle(uploadToken), genPictureCardStyle(uploadToken), genListStyle(uploadToken), genMotionStyle(uploadToken), genRtlStyle(uploadToken), genCollapseMotion(uploadToken)];
}, token => ({
  actionsColor: token.colorTextDescription
}));