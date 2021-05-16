import { mergeStyleSets } from "@uifabric/merge-styles";
import theme, { layout } from "../../theme.style";

export const pxToRem = (px) => `${px * 0.0625}rem`;

export default mergeStyleSets({
  width: pxToRem(layout.constants.leftNav.width),
  backgroundColor: theme.palette.neutralWhite,
  borderRight: "1px solid #eee",
  overflowY: "auto",
  zIndex: 10,
  position: "fixed",
  left: 0,
  transition: "0.5s",
});
