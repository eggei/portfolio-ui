import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { BotResponses } from "../BotResponses";
import styled, { css } from "styled-components";
import { extractDialogMessages } from "./helpers";

const TextBox = styled.input`
  border: 0;
  padding: 0 0 0 8px;
  text-align: center;
  font-size: 24px;
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
  border-radius: 32px;
  height: 200px;
  width: fit-content;
  min-width: 300px;
  display: grid;
  place-content: center;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.02),
    -20px 20px 20px 20px rgba(0, 0, 0, 0.02);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-width: 0;
  &:focus {
    outline: none;
  }
`;

const submitSound = new Howl({
  src: ["/sounds/zapsplat_cartoon_bubble_pop.mp3"],
});

export const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const textBoxRef = useRef(null);

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
    submitSound.play();
    e.preventDefault();
    const question = textBoxRef.current.value;
    // do nothing if no question
    if (!question) return;
    // otherwise get intent and update convo
    getIntent(question);
    // clear the input value
    textBoxRef.current.value = "";
  };

  return (
    <main style={{ width: "100%" }}>
      <BotResponses responses={answers} />
      <ChatBubble onSubmit={onSubmit}>
        <TextBox
          ref={textBoxRef}
          // value={question}
          // onInput={(e) => setQuestion(e.target.value)}
          placeholder="type and hit enter"
          autoFocus
        />
        {/* <Button
            size="small"
            startIcon={<KeyboardReturnIcon />}
            type="submit"
          /> */}
      </ChatBubble>
    </main>
  );
};
