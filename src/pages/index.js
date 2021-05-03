import React, { useState } from "react";
import useSWR from "swr";
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
  const [convoHistory, setConvoHistory] = useState([]);

  const getIntent = () => {
    fetch("http://localhost:8888/api/get-intent", {
      method: "POST",
      body: JSON.stringify({
        Message: question,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        const a = r.FulfillmentMessages[0].Message.Text.text[0];
        console.log(a)
        setConvoHistory(convo => [ ...convo, a ]);
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getIntent(question);
    setConvoHistory([...convoHistory, question]);
    setQuestion("");
  };

  return (
    <ThemeProvider theme={theme}>
      <main style={pageStyles}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {convoHistory.map((m, k) => (
            <li
              key={m+k}
              style={{
                // TODO: not a good way of handling colors, make convo list an array of objects with speaker id
                background: k%2 ? "lightseagreen" : "lightgreen",
                borderRadius: 8,
                padding: 8,
                margin: 4,
                width: "fit-content",
              }}
            >
              {m}
            </li>
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
