import React, { useEffect, useState, useRef } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";

import {
  Button,
  createMuiTheme,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["VT323"].join(","),
  },
});

const TextBox = styled.input`
  border: 0;
  padding: 0 0 0 8px;
  text-align: center;
  font-size: 16;
  /* height: 36px; */
  &:focus-visible {
    outline: 0;
    /* padding-left: 4px; */
    /* border-left: 4px solid deepskyblue; */
  }
  /* width: 100%; */
`;

const ChatBubble = styled.form`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  height: 240px;
  width: fit-content;
  min-width: 240px;
  display: grid;
  place-content: center;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.02),
    -20px 20px 20px 20px rgba(0, 0, 0, 0.02);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  // smooth scroll to bottom
  const convoViewRef = useRef(null);
  useEffect(() => {
    if (convoViewRef && convoViewRef.current) {
      const el = convoViewRef.current;
      console.log("el :>> ", el.scrollHeight);
      el.scrollTop = el.scrollHeight;
    }
  });

  const pushToConvo = (newMessages) => {
    const isArray = Array.isArray(newMessages);
    setConvoHistory((convo) => [
      ...convo,
      ...(isArray ? newMessages : [newMessages]),
    ]);
  };

  const [answers, setAnswers] = useState([]);
  const getIntent = async (initQ) => {
    fetch("http://localhost:8888/api/get-intent", {
      method: "POST",
      body: JSON.stringify({ question: initQ || question }),
    })
      .then((r) => r.json())
      .then((r) => {
        // pushToConvo(extractDialogMessages(r));
        setAnswers(extractDialogMessages(r));
      })
      .catch((err) => console.error(err));
  };

  // Start the convo on layout
  useEffect(() => {
    getIntent("Hi");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // do nothing if no question
    if (!question) return;
    // otherwise get intent and update convo
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
      <main style={{ width: "100%" }}>
        {/* <ul
          ref={convoViewRef}
          style={{
            listStyleType: "none",
            padding: 8,
            borderRadius: 4,
            border: "1px solid black",
            width: 600,
            height: 400,
            overflow: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {printMessages(convoHistory)}
        </ul> */}
        {printMessages(answers)}
        <ChatBubble onSubmit={onSubmit}>
          <TextBox
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="type and hit enter"
          />
          <Button
            size="small"
            startIcon={<KeyboardReturnIcon />}
            type="submit"
          />
        </ChatBubble>
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

    const extractedMessage = Message[type][Object.keys(Message[type])[0]];

    return {
      type,
      owner: Owner.BOT,
      content: extractedMessage,
    };
  });

  return dialogMessages;
}

const AnswerText = styled.p`
  font-size: 32px;
  font-family: VT323, monospace;
  color: slateblue;
  text-shadow: 4px 3px 0px hsl(210deg 13% 50% / 21%);
`;

function printMessages(convo) {
  return convo.map((message, k) => {
    let content;
    switch (message.type) {
      case ContentType.TEXT: {
        content = <AnswerText>{message.content}</AnswerText>;
        break;
      }
      case ContentType.PAYLOAD: {
        content = message.content.map((c) => {
          const { pathname, label, type, href, emoticon } = c;
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
            case "emoticon": {
              return <p style={{ fontSize: 40 }}>{emoticon}</p>;
            }
          }
        });
        break;
      }
      default:
        break;
    }

    const id = `${message.content.toString()}_${k}`;
    return (
      <span
        key={id}
        style={{ display: "block", width: "100%", textAlign: "center" }}
      >
        {content}
      </span>
    );
  });
}
