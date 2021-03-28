import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import adapter from "webrtc-adapter";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto";
import App from "./App";

console.log(adapter.browserDetails);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#00203F" },
    secondary: { main: "#ADEFD1"},
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
