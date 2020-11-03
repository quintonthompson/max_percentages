import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2979ff",
      light: "#75a7ff",
      dark: "#004ecb",
    },
    secondary: {
      main: "#616161",
      light: "#8e8e8e",
      dark: "#373737",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
