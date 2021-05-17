import React, { Fragment } from "react";
import TypeIt from "typeit-react";
import { extractMessagesByType } from "./Chat/helpers";

export type TBotResponse = {
  type: "Text" | "Payload";
  id: string;
  content: any;
};

export function BotResponses({ responses }: { responses: TBotResponse[] }) {
  if (responses.length === 0) return null;
  const { emoticon, text, action } = extractMessagesByType(responses);

  const renderActions = (actionArr: unknown[]) =>
    actionArr.length > 0 && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {action}
      </div>
    );

  const renderText = (textArr: string[]) =>
    textArr.map((t, i) => (
      <Fragment key={i}>
        {t}
        <br />
      </Fragment>
    ));

  return (
    <React.Fragment key={`message#${Date.now()}`}>
      {emoticon && emoticon}
      {text && (
        <AnimatedTyping>
          {renderText(text)}
          {renderActions(action)}
        </AnimatedTyping>
      )}
    </React.Fragment>
  );
}

function AnimatedTyping({ children }) {
  return (
    <TypeIt
      element="div"
      style={{
        width: "100%",
        textAlign: "center",
        fontFamily: "Yanone Kaffeesatz",
        fontSize: 36,
      }}
      options={{
        waitUntilVisible: true,
        speed: 20,
        cursor: false,
      }}
    >
      {children}
    </TypeIt>
  );
}
