import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { AppTheme } from "./style";

const ThemeProviderWrapper = (props) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={AppTheme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
