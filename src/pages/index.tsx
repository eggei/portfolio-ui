import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Chat } from "../components/Chat/Chat";
import { ThreeJS } from "../components/ThreeJS";
import "../shared/global.css";
import { MainScene } from "../components/MainScene/MainScene";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["VT323"].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Chat /> */}
      {/* <ThreeJS /> */}
      <MainScene />
    </ThemeProvider>
  );
};

export default App;
