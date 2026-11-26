import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    shadowGrey: Palette["primary"];
    shamrock: Palette["primary"];
    parchment: Palette["primary"];
  }

  interface PaletteOptions {
    shadowGrey?: PaletteOptions["primary"];
    shamrock?: PaletteOptions["primary"];
    parchment?: PaletteOptions["primary"];
  }

  interface TypographyVariants {
    body: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body: true;
  }
}

const shadowGrey = "#232528";
const shamrock = "#169873";
const parchment = "#F2EDEB";
const fontFamily = '"Open Sans", sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: shamrock,
      light: "#3cb892",
      dark: "#0f7a5c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: shadowGrey,
      light: "#3a3e43",
      dark: "#16181a",
      contrastText: parchment,
    },
    background: {
      default: parchment,
      paper: "#ffffff",
    },
    text: {
      primary: shadowGrey,
      secondary: "#5c6166",
    },
    divider: "rgba(35, 37, 40, 0.12)",
    shadowGrey: {
      main: shadowGrey,
      light: "#2c3034",
      dark: "#16181a",
      contrastText: parchment,
    },
    shamrock: {
      main: shamrock,
      light: "#3cb892",
      dark: "#0f7a5c",
      contrastText: "#ffffff",
    },
    parchment: {
      main: parchment,
      light: "#faf8f6",
      dark: "#e4ddd8",
      contrastText: shadowGrey,
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily,
    h1: {
      fontFamily,
      fontWeight: 700,
      fontSize: "clamp(2rem, 1.35rem + 1.8vw, 3rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily,
      fontWeight: 700,
      fontSize: "clamp(1.75rem, 1.25rem + 1.2vw, 2.25rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontFamily,
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 1.15rem + 0.8vw, 1.875rem)",
      lineHeight: 1.25,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily,
      fontWeight: 700,
      fontSize: "clamp(1.25rem, 1.05rem + 0.5vw, 1.5rem)",
      lineHeight: 1.3,
      letterSpacing: "-0.015em",
    },
    h5: {
      fontFamily,
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontFamily,
      fontWeight: 600,
      fontSize: "1.0625rem",
      lineHeight: 1.45,
    },
    subtitle1: {
      fontFamily,
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "-0.011em",
    },
    subtitle2: {
      fontFamily,
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.45,
      letterSpacing: "0.01em",
    },
    body1: {
      fontFamily,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body: {
      fontFamily,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.55,
    },
    button: {
      fontFamily,
      fontWeight: 700,
      fontSize: "0.9375rem",
      lineHeight: 1.4,
      letterSpacing: "0.01em",
      textTransform: "none",
    },
    caption: {
      fontFamily,
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      letterSpacing: "0.02em",
    },
    overline: {
      fontFamily,
      fontWeight: 700,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          paddingBlock: 10,
        },
        sizeLarge: {
          paddingBlock: 12,
          fontSize: "1rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 28,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
  },
});

export default theme;
