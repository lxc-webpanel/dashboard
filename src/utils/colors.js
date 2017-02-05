import {
  white as w,
  black as b,

  blue50,
  blue100,
  blue300,
  blue500,
  blue700,

  lightGreen50,
  lightGreen100,
  lightGreen300,
  lightGreen500,
  lightGreen700,

  orange50,
  orange100,
  orange300,
  orange500,
  orange700,

  red50,
  red100,
  red300,
  red500,
  red700
} from 'material-ui/styles/colors';
import { STOPPED, FROZEN } from './states';

export const white = w;
export const black = b;

export const info = {
  dark: blue700,
  base: blue500,
  mediumLight: blue300,
  light: blue100,
  extraLight: blue50
};

export const success = {
  dark: lightGreen700,
  base: lightGreen500,
  mediumLight: lightGreen300,
  light: lightGreen100,
  extraLight: lightGreen50
};

export const warning = {
  dark: orange700,
  base: orange500,
  mediumLight: orange300,
  light: orange100,
  extraLight: orange50
};

export const danger = {
  dark: red700,
  base: red500,
  mediumLight: red300,
  light: red100,
  extraLight: red50
};

const colors = {
  white,
  black,
  info,
  success,
  warning,
  danger
};

export const getResourcesStatusColor = (value, theme = 'base') => {
  if (value >= 90) {
    return colors.danger[theme];
  } else if (value >= 75) {
    return colors.warning[theme];
  }

  return colors.success[theme];
};

export const getStateStatusColor = state => {
  if (state === STOPPED) {
    return colors.danger.extraLight;
  } else if (state === FROZEN) {
    return colors.info.extraLight;
  }

  return colors.success.extraLight;
};

export default colors;
