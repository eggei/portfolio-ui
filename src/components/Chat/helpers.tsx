import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { TBotResponse } from "../BotResponses";

const ContentType = {
  TEXT: "Text",
  PAYLOAD: "Payload",
};

type FulfillmentMessage = {
  Message: { Text: { text: string[] } };
};

type NLPResponse = {
  confidence: number;
  entities: Record<string, unknown>;
  fulfillmentMessages: FulfillmentMessage[];
  intent: string;
};

export const extractDialogMessages = (apiResponse: NLPResponse) => {
  return apiResponse.fulfillmentMessages.map(({ Message }) => {
    let type;
    if (Message[ContentType.PAYLOAD]) type = ContentType.PAYLOAD;
    if (Message[ContentType.TEXT]) type = ContentType.TEXT;

    const extractedMessage = Message[type][Object.keys(Message[type])[0]];

    return {
      id: `message#${Date.now()}`,
      type,
      content: extractedMessage,
    } as TBotResponse;
  }) as TBotResponse[];
};

const actionStyles = css`
  --color: 0, 132, 255; // link blue
  border-radius: 20px;
  border: 1px solid rgb(var(--color));
  padding: 8px 16px;
  font-size: 16px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-decoration: none;
  color: rgb(var(--color));
  &:visited {
    color: rgb(var(--color));
  }
  &:hover {
    background-color: rgba(var(--color), 0.3);
  }
`;

const Action = styled(Link)`
  ${actionStyles}
`;

const ActionLink = styled.a`
  ${actionStyles}
`;

export function extractMessagesByType(botResponses: TBotResponse[]) {
  let emoticonContent: React.ReactElement<HTMLParagraphElement>[] = [];
  let textContent: string[] = [];
  let actionContent: React.ReactElement<HTMLButtonElement>[] = [];
  botResponses.forEach((message: TBotResponse, k) => {
    switch (message.type) {
      case ContentType.TEXT: {
        textContent = [...textContent, ...message.content];
        break;
      }
      case ContentType.PAYLOAD: {
        message.content.map((c) => {
          const { pathname, label, type, href, emoticon } = c;
          switch (type) {
            case "internal": {
              actionContent.push(
                <Action key={`${label}_${pathname}`} to={pathname}>
                  {label}
                </Action>
              );
              break;
            }
            case "external": {
              actionContent.push(
                <ActionLink
                  key={`${label}_${href}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </ActionLink>
              );
              break;
            }
            case "emoticon": {
              emoticonContent.push(
                <div
                  key={`emoticon_${Date.now()}`}
                  style={{ width: "100%", textAlign: "center", fontSize: 40 }}
                >
                  {emoticon}
                </div>
              );
              break;
            }
            default:
              break;
          }
        });
        break;
      }
      default:
        break;
    }

    // const id = `${message.content.toString().replaceAll(" ", "-")}_${k}`;
  });
  return {
    emoticon: emoticonContent,
    text: textContent,
    action: actionContent,
  };
}
