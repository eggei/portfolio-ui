import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import {
  createMuiTheme,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const theme = createMuiTheme({
  // typography: {
  //   fontFamily: ["Lora"].join(","),
  // },
});

const TextBox = styled.input`
  border: 0;
  padding: 0 0 0 8px;
  height: 36px;
  &:focus-visible {
    outline: 0;
    padding-left: 4px;
    border-left: 4px solid deepskyblue;
  }
`;

const Owner = {
  USER: "user",
  BOT: "bot",
};

const ContentType = {
  TEXT: "Text",
  PAYLOAD: "Payload",
};

const App = () => {
  const [question, setQuestion] = useState("");
  const [convoHistory, setConvoHistory] = useState([]);
  const convoViewRef = useRef(null)

  useEffect(() => {
    if (convoViewRef && convoViewRef.current) {
      const el = convoViewRef.current
      console.log('el :>> ', el.scrollHeight);
      el.scrollTop = el.scrollHeight
    }
  })

  const pushToConvo = (newMessages) => {
    const isArray = Array.isArray(newMessages);
    setConvoHistory((convo) => [
      ...convo,
      ...(isArray ? newMessages : [newMessages]),
    ]);
  };

  const getIntent = async (initQ) => {
    fetch("http://localhost:8888/api/get-intent", {
      method: "POST",
      body: JSON.stringify({ question: initQ || question }),
    })
      .then((r) => r.json())
      .then((r) => {
        pushToConvo(extractDialogMessages(r));
      })
      .catch((err) => console.error(err));
  };

  // Start the convo on layout
  useEffect(() => {
    getIntent("Hi");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    getIntent(question);
    pushToConvo({
      type: ContentType.TEXT,
      owner: Owner.USER,
      content: [question],
    });
    setQuestion("");
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <ul
          ref={convoViewRef}
          style={{
            listStyleType: "none",
            padding: 8,
            borderRadius: 4,
            border: "1px solid black",
            width: 600,
            height: 400,
            overflow: "scroll",
            scrollBehavior: 'smooth'
          }}
        >
          {printMessages(convoHistory)}
        </ul>
        <form style={{ position: "fixed", bottom: 16 }} onSubmit={onSubmit}>
          <TextBox
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <IconButton style={{ padding: 0 }}>
            <KeyboardReturnIcon />
          </IconButton>
        </form>
      </main>
    </ThemeProvider>
  );
};

export default App;

function extractDialogMessages(apiResponse) {
  const dialogMessages = apiResponse.fulfillmentMessages.map(({ Message }) => {
    let type;
    if (Message[ContentType.PAYLOAD]) type = ContentType.PAYLOAD;
    if (Message[ContentType.TEXT]) type = ContentType.TEXT;

    const extractedMessage =
      Message[type][type === ContentType.TEXT ? "text" : "links"];

    return {
      type,
      owner: Owner.BOT,
      content: extractedMessage,
    };
  });

  return dialogMessages;
}

function printMessages(convo) {
  return convo.map((message, k) => {
    console.log("message :>> ", message);
    let liContent;
    switch (message.type) {
      case ContentType.TEXT: {
        liContent = message.content;
        break;
      }
      case ContentType.PAYLOAD: {
        liContent = message.content.map((link) => {
          const { pathname, label, type, href } = link;
          switch (type) {
            case "internal": {
              return (
                <button onClick={() => navigate(pathname)}>{label}</button>
              );
            }
            case "external": {
              return (
                <a href={href} target="_blank">
                  {label}
                </a>
              );
            }
          }
        });
        break;
      }
      default:
        break;
    }
    const id = `${message.content.toString()}_${k}`;
    const liStyle = {
      background: message.owner === "user" ? "lightseagreen" : "lightgreen",
      borderRadius: 8,
      padding: 8,
      margin: 4,
      width: "fit-content",
    };

    return (
      <li
        key={id}
        style={message.type === ContentType.TEXT ? liStyle : undefined}
      >
        {liContent}
      </li>
    );
  });
}
