import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { ChatType } from "../../types/types";
import React, { useState } from "react";
import ChatOption from "./ChatOption";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function ChatContext(chat: ChatType) {
  const [showChatOption, setShowChatOption] = useState<boolean>(false);
  const [isHover, setHover] = useState<boolean>(false);
  const reactorData = useSelector((state: RootState) => state.ClickedChannel.findUserData);
  return (
    <div
      onMouseOver={() => {
        setShowChatOption(true);
      }}
      onMouseLeave={() => {
        setShowChatOption(false);
      }}
    >
      <ChatContainer>
        <Header>
          <HeaderLeft>
            <h4>
              {chat.has_bookmarked && <StarIcon />}
              {!chat.has_bookmarked && <StarBorderOutlinedIcon />}
            </h4>
            <h1>{chat.chatter && chat.chatter.display_name}</h1>
          </HeaderLeft>
          <br></br>
          <HeaderRight>
            {showChatOption && (
              <span className="bg-gray-50">
                <ChatOption {...chat} />
              </span>
            )}
          </HeaderRight>
        </Header>
        <ChatMessages>
          <h2>{chat.message}</h2>
          <span className="text-sm text-gray-700">
            {/*{created_at.slice(0, 10)}&nbsp;{created_at.slice(11, 19)}*/}
            {chat.converted_created_at}
          </span>
        </ChatMessages>
        <div>
          {chat.reaction &&
            chat.reaction.map(item => (
              <ReactionContainer
                key={item.id}
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                {item.icon}
                {item.reactors.length}
              </ReactionContainer>
            ))}
        </div>
      </ChatContainer>
    </div>
  );
}

export default ChatContext;

const ChatMessages = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;

  > span {
    white-space: nowrap;
    margin-right: 10px;
    color: black;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const ReactionContainer = styled.span`
  display: inline-block;
  text-align: center;
  background-color: rgba(206, 205, 205, 0.51);
  width: 40px;
  padding-bottom: 2px;
  margin-left: 15px;
  border-radius: 10px;
  color: rgba(51, 51, 51, 0.86);
  //:hover {
  //  text-align: left;
  //  width: 100px;
  //  margin-left: 15px;
  //}
`;
