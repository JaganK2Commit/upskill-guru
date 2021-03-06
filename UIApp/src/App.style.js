import { mergeStyleSets } from '@uifabric/merge-styles';
import theme, { layout } from './theme.style';


const pxToRem = px => `${px * 0.0625}rem`;


export default mergeStyleSets({
  mainContentContainer: {
    position: 'relative',
    left: pxToRem(layout.constants.leftNav.width),
    width : '80%',
    paddingTop: pxToRem(layout.constants.mainContentContainer.topMargin)
  },
  Container: {
    backgroundColor: theme.palette.white,
    position: 'relative',
    horizontalAlign : 'center',
    left: pxToRem(layout.constants.leftNav.width),
    width : '80%',
    minHeight : pxToRem(layout.constants.mainContainer.minHeight),
  },
});
