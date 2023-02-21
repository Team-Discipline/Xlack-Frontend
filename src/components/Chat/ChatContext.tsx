import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { ChatType } from "../types";

function ChatContext({ id, channel, chatter, message, created_at }: ChatType) {
  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>{channel}</strong>
              <StarBorderOutlinedIcon />
            </h4>
            {chatter.username}
          </HeaderLeft>
          <br></br>
          <HeaderRight>
            {created_at.slice(0, 10)}&nbsp;{created_at.slice(11, 19)}
          </HeaderRight>
        </Header>
        <ChatMessages>
          <h2>{message}</h2>
        </ChatMessages>
      </>
    </ChatContainer>
  );
}

export default ChatContext;

const ChatMessages = styled.div``;
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
    margin-left: 20px;
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
  background-color: #ede8e8;
  border: 1px solid black;
  border-radius: 3px;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;
