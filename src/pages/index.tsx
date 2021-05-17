import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Chat } from "../components/Chat/Chat";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["VT323"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Chat />
    </ThemeProvider>
  );
};

export default App;
