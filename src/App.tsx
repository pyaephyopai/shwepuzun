import { alpha, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import GlobalComponents from "./GlobalComponents";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#000",
        light: alpha("#000", 0.65),
      },
      tertiary: {
        main: "#fca311",
        light: "#fca311",
        dark: "#f29602",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Roboto Slab", "sans-serif", "Arial"].join(","),
    },
    breakpoints: {
      values: {
        xs: 0,
        smx: 480,
        sm: 600,
        smd: 750,
        md: 900,
        lg: 1200,
        xl: 1536,
        inner_wrap: 1280,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalComponents />
      </ThemeProvider>
    </>
  );
}

export default App;
