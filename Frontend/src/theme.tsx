import { createTheme } from "@mui/material";
import styles from "./sass/styles.module.scss";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1280,
      xl: 1920,
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "input::-ms-reveal, input::-ms-clear": {
            display: "none",
          },
          "& input": {
            padding: "0.625rem 0.938rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.darksilver,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.darksilver,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.darksilver,
          },
          color: styles.blackColor,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
        },
        ol: {
          fontSize: "0.75rem",
          marginLeft: "0.3125rem",
        },
        li: {
          fontSize: "0.75rem",
          marginLeft: "0rem",
          marginRight: "0rem",
          p: {
            fontSize: "0.75rem",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0.125rem",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.25rem",
          minWidth: "7.5rem",
          backgroundColor: styles.primaryColor,
          color: styles.whiteColor,
          "&:hover": {
            backgroundColor: styles.primaryColor,
            color: styles.whiteColor,
            borderRadius: "0.25rem",
          },
        },
        outlined: {
          textTransform: "none",
          borderRadius: "0.25rem",
          minWidth: "7.5rem",
          backgroundColor: styles.whiteColor,
          color: styles.darkColor,
          borderColor: styles.darkColor,
          "&:hover": {
            backgroundColor: styles.whiteColor,
            color: styles.darkColor,
            borderRadius: "0.25rem",
            borderColor: styles.darkColor,
          },
        },
        sizeSmall: {
          padding: "0.375rem 1rem",
        },
        sizeMedium: {
          padding: "0.5rem 1.25rem",
        },
        sizeLarge: {
          padding: "0.6875rem 1.5rem",
        },
        textSizeSmall: {
          padding: "0.4375rem 0.75rem",
        },
        textSizeMedium: {
          padding: "0.5625rem 1rem",
        },
        textSizeLarge: {
          padding: "0.75rem 1rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0.9375rem",
          "&:last-child": {
            paddingBottom: "0.9375rem",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "2rem 1.5rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "0.375rem 0.625rem",
          "&:hover,&:focus": {
            backgroundColor: styles.primaryColor,
            color: styles.whiteColor,
            borderRadius: "0rem",
          },
          fontSize: "0.875rem",
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        ".pac-container": {
          zIndex: "9999",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: styles.primaryColor,
          ".MuiTableCell-root": {
            color: styles.primaryColor,
          },
          // borderBottom: 'none',
          "& .MuiTableCell-root": {
            fontSize: "0.75rem",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "none",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
          "& .MuiTableCell-head": {
            color: styles.whiteColor,
          },
          "& .MuiTableHead-root": {
            backgroundColor: styles.whiteColor,
          },
        },
      },
    },
  },

  palette: {
    action: {
      active: styles.darkColor,
      focus: styles.darkPrimaryColor,
      hover: styles.darkPrimaryColor,
      selected: styles.darkPrimaryColor,
      disabledBackground: styles.darksilver,
      disabled: styles.litesilver,
    },

    background: {
      default: styles.whiteColor,
      paper: styles.whiteColor,
    },

    divider: styles.darkColor,

    primary: {
      main: styles.primaryColor,
      light: styles.litesilver,
      dark: styles.darkColor,
      contrastText: styles.whiteColor,
    },

    secondary: {
      main: styles.secondaryColor,
      light: styles.litesilver,
      dark: styles.darkSecondaryColor,
      contrastText: styles.whiteColor,
    },

    success: {
      main: styles.successMainColor,
      light: styles.successLightColor,
      dark: styles.successDarkColor,
      contrastText: styles.whiteColor,
    },
    info: {
      main: styles.infoMainColor,
      light: styles.infoLightColor,
      dark: styles.infoDarkColor,
      contrastText: styles.whiteColor,
    },
    warning: {
      main: styles.warningMainColor,
      light: styles.warningLightColor,
      dark: styles.warningDarkColor,
      contrastText: styles.whiteColor,
    },
    error: {
      main: styles.errorMainColor,
      light: styles.errorLightColor,
      dark: styles.errorDarkColor,
      contrastText: styles.whiteColor,
    },
    text: {
      primary: styles.darkColor,
      secondary: styles.textSecondaryColor,
      disabled: styles.litesilver,
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: styles.primaryFont,
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },

    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.0313rem",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontFamily: styles.secondryFont,
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontFamily: styles.secondryFont,
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontFamily: styles.secondryFont,
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontFamily: styles.secondryFont,
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontFamily: styles.secondryFont,
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.375,
    },
    button: {
      textTransform: "none",
      lineHeight: "normal",
    },
  },
});
