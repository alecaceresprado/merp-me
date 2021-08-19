import { createTheme } from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/deepOrange";
import lightBlue from "@material-ui/core/colors/lightBlue";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  palette: {
    primary: {
      main: lightBlue[700],
    },
    secondary: {
      main: deepOrange.A400,
    }
  },
});