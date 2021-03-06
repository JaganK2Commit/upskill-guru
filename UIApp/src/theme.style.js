import { loadTheme } from '@uifabric/styling';

const pxToRem = px => `${px * 0.0625}rem`;


const palette = {
  themePrimary: '#781042',
  themeLighterAlt: '#faf1f5',
  themeLighter: '#e9c9d9',
  themeLight: '#d69eba',
  themeTertiary: '#ae537f',
  themeSecondary: '#882052',
  themeDarkerAlt: '#6c0e3b',
  themeDark: '#5b0c32',
  themeDarker: '#430925',
  neutralLighterAlt: '#FAF9F8',
  neutralLighter: '#F3F2F1',
  neutralLight: '#EDEBE9',
  neutralQuaternaryAlt: '#E1DFDD',
  neutralQuaternary: '#D2D0CE',
  neutralTertiaryAlt: '#C8C6C4',
  neutralTertiary: '#A19F9D',
  neutralSecondary: '#605E5C',
  neutralPrimaryAlt: '#3B3A39',
  neutralPrimary: '#323130',
  neutralDark: '#201F1E',
  neutralWhite: '#FFFFFF',
  black: '#3a3836',
  white: '#faf9f8',
};

const theme = loadTheme({
  palette,
  defaultFontStyle: {
    fontSize: pxToRem(16),
    lineHeight: pxToRem(22),
  },
  fonts: {
    small: {
      fontSize: pxToRem(12),
      lineHeight: pxToRem(16),
      color: palette.neutralSecondary,
    },
    medium: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
      fontWeight: 600,
    },
    large: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(22),
      fontWeight: 600,
    },
    xLarge: {
      fontSize: pxToRem(22),
      lineHeight: pxToRem(30),
      fontWeight: 600,
    },
  },
});

export default theme;

export const layout = {
  constants: {
    topNav: {
      height: 48,
    },
    commandBar: {
      height: 45,
    },
    leftNav: {
      width: 228,
    },
    mainContainer: {
      minHeight: 800,
    },
    mainContentContainer: {
      minHeight: 800,
      topMargin: 45
    },
  },
};
