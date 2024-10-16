import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material" {
  interface Palette {
    tertiary: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    tertiary: true;
  }
}

import "@mui/material/IconButton";

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    smx: true;
    smd: true;
    inner_wrap: true;
  }
}
