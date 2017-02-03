import {
  white as w,
  black as b,

  blue100,
  blue300,
  blue500,
  blue700,

  lightGreen100,
  lightGreen300,
  lightGreen500,
  lightGreen700,

  orange100,
  orange300,
  orange500,
  orange700,

  red100,
  red300,
  red500,
  red700
} from 'material-ui/styles/colors';

export const white = w;
export const black = b;

export const info = {
  base: blue500,
  dark: blue700,
  light: blue300,
  extraLight: blue100
};

export const success = {
  base: lightGreen500,
  dark: lightGreen700,
  light: lightGreen300,
  extraLight: lightGreen100
};

export const warning = {
  base: orange500,
  dark: orange700,
  light: orange300,
  extraLight: orange100
};

export const danger = {
  base: red500,
  dark: red700,
  light: red300,
  extraLight: red100
};

const colors = {
  white,
  black,
  info,
  success,
  warning,
  danger
};

export const getStatusColor = (value, theme = 'base') => {
  if (value >= 90) {
    return colors.danger[theme];
  } else if (value >= 75) {
    return colors.warning[theme];
  }

  return colors.success[theme];
};

export default colors;
