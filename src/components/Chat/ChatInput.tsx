import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { UpdateChat } from "../../variable/UpdateChatContextSlice";
import { findUserDataInClickedChannel } from "../../variable/ClickedChannelSlice";
import { at, WsUrl_chat } from "../../variable/cookie";
import ChatMentionModal from "./ChatMentionModal";

function ChatInput(props: any) {
  const [msg, setmsg] = useState("");
  const [socket, setsocket] = useState<WebSocket>();
  const [showMentionModal, setShowMentionModal] = useState(false);
  const [mentionName, setMentionName] = useState<string>("");
  const enterChannelHv = useSelector((state: RootState) => state.ClickedChannel?.channelData).hashed_value;
  const CompleteGetWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.CompletegetWorkspace);
  const Myworkspace = useSelector((state: RootState) => state.getMyWorkSpace.MyWorkSpace);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [MyWebSocket, setMyWebSocket] = useState<{ ch_hv: string; wb: WebSocket }[]>([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (CompleteGetWorkspace) {
      Myworkspace.forEach(w => {
        w.chat_channel?.forEach(c => {
          const channel_hv = c.hashed_value;
          const webSocket = new WebSocket(`${WsUrl_chat}${channel_hv}/`);
          MyWebSocket.push({ ch_hv: c.hashed_value, wb: webSocket });
          webSocket.onopen = () => {
            webSocket.send(
              JSON.stringify({
                authorization: at,
              }),
            );

            console.log("웹소켓 연결");
          };
        });
      });
    }
  }, [CompleteGetWorkspace]);
  useEffect(() => {
    console.log("입력하려는 웹소켓", MyWebSocket);
    MyWebSocket.forEach(w => {
      if (w.ch_hv === enterChannelHv) {
        setsocket(w.wb);
      }
      if (enterChannelHv !== "") {
        w.wb.onmessage = message => {
          // 클라이언트로부터 메시지 수신 시
          const m = JSON.parse(message.data);
          dispatch(findUserDataInClickedChannel(m.user_id));
          props.receive(w.ch_hv, m);
          dispatch(UpdateChat());
        };
        w.wb.onerror = () => {
          console.log(event);
        };
      }
    });
  }, [enterChannelHv]);

  const sendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (socket) {
      socket.send(
        JSON.stringify({
          message: msg,
        }),
      );
      console.log(msg);
    }

    if (inputRef.current) {
      // enter 치면 chatbox 공백으로 초기화 됨
      inputRef.current.value = "";
      setmsg("");
    }
  };
  const ChooseMention = (name: string) => {
    if (inputRef.current) {
      // enter 치면 chatbox 공백으로 초기화 됨
      inputRef.current.value = "@" + name + " ";
      setmsg("@" + name + " ");
    }
    setShowMentionModal(false);
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputRef}
          onChange={e => {
            const inputMsg = e.target.value;
            setmsg(inputMsg);
            inputMsg.split(" ").forEach(v => {
              if (v.startsWith("@")) {
                // 모달 띄우고 클릭시 해당 문구 앞에 추가
                setMentionName(v.trim());
                setShowMentionModal(true);
                console.log("call mention");
              } else {
                setShowMentionModal(false);
              }
            });
          }}
          placeholder={`Message #`}
        />
        <button hidden type="submit" onClick={sendMessage}>
          SEND
        </button>
        {showMentionModal && <ChatMentionModal inputMsg={mentionName} Choose={ChooseMention} />}
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
