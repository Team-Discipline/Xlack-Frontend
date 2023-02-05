import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { at, WsUrl_chat } from "../../variable/cookie";
import { UpdateChat } from "../../variable/UpdateChatContextSlice";

function ChatInput() {
  const [msg, setmsg] = useState("");
  const [socket, setsocket] = useState<WebSocket>();
  const enterChannelHv = useSelector(
    (state: RootState) => state.ClickedChannel.channel_hashde_value
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (enterChannelHv !== "") {
      setsocket(new WebSocket(`${WsUrl_chat}${enterChannelHv}/`));
    }
  }, [enterChannelHv]);

  useEffect(() => {
    console.log("현재 소켓", enterChannelHv);
    if (socket) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            authorization: at,
          })
        );
        console.log("웹소켓 연결");
      };
    }
  }, [socket]);

  const sendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (socket) {
      console.log(socket);
      socket.send(
        JSON.stringify({
          message: msg,
        })
      );

      console.log(msg);

      socket.onmessage = (message) => {
        // 클라이언트로부터 메시지 수신 시
        console.log(message);
        dispatch(UpdateChat());
      };
      socket.onerror = () => {
        console.log(event);
      };
    }

    if (inputRef.current) {
      // enter 치면 chatbox 공백으로 초기화 됨
      inputRef.current.value = "";
      setmsg("");
    }
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputRef}
          onChange={(e) => setmsg(e.target.value)}
          placeholder={`Message #`}
        />
        <button hidden type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 40%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
