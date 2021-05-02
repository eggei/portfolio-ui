import React, { useState } from "react";
import {
  createMuiTheme,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const pageStyles = {
  padding: 24,
  color: "#232129",
  width: "100vw",
  height: "100%",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Lora"].join(","),
  },
});

const App = () => {
  const [question, setQuestion] = useState("");
  const [convoHistory, setConvoHistory] = useState([""]);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.children);
    setConvoHistory([...convoHistory, question]);
    setQuestion("");
  };

  return (
    <ThemeProvider theme={theme}>
      <main style={pageStyles}>
        <div style={{ fontSize: "2em" }}>{"Hello! Who is this?"}</div>
        <ul>
          {convoHistory.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextField
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <IconButton>
            <KeyboardReturnIcon />
          </IconButton>
        </form>
      </main>
    </ThemeProvider>
  );
};

function getLastItem(arr) {
  return arr[arr.length - 1];
}

export default App;
