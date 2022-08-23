import "../styles/globals.css";
import { wrapper, store } from "../src/store";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "../src/theme/ThemeProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
