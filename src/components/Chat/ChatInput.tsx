import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../app/store";
import { UpdateChat } from "../../variable/UpdateChatContextSlice";
import { findUserDataInClickedChannel } from "../../variable/ClickedChannelSlice";
import { at, backUrl, WsUrl_chat } from "../../variable/cookie";
import ChatMentionModal from "./ChatMentionModal";
import { showNotification } from "../Notification/notification";
import { SocketReceiveChatType } from "../../types/types";
import axios from "axios";

type ChatInputProps = {
  receive: (ch_hv: string, data: SocketReceiveChatType) => void;
};
const ChatInput = (props: ChatInputProps) => {
  const [msg, setmsg] = useState("");
  const [socket, setsocket] = useState<WebSocket>();
  const UpdateChannel = useSelector((state: RootState) => state.UpdateChannel);
  const [showMentionModal, setShowMentionModal] = useState(false);
  const [mentionName, setMentionName] = useState<string>("");
  const Clicked_channel = useSelector((state: RootState) => state.ClickedChannel?.channelData);
  const Clicked_channel_hv = Clicked_channel.hashed_value;
  const CompleteGetWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.CompletegetWorkspace);
  const Myworkspace = useSelector((state: RootState) => state.getMyWorkSpace.MyWorkSpace);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const File_name = useSelector((state: RootState) => state.Chat.SendMessage.file_name);
  const [MyWebSocket, setMyWebSocket] = useState<{ ch_hv: string; wb: WebSocket }[]>([]);
  const notifi = useSelector((state: RootState) => state.UnReadChannel);
  const [NWebSocket, setNWebSocket] = useState<{ ch_hv: string; wb: WebSocket }[]>([]);
  const notifiSetting = useSelector((state: RootState) => state.OnModal.OnNotification);
  const MyProfile = useSelector((state: RootState) => state.getMyProfile.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("1");
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
          };
        });
      });
    }
  }, [CompleteGetWorkspace]);
  useEffect(() => {
    if (UpdateChannel.lastAddedChannel_hv !== "") {
      const hv = UpdateChannel.lastAddedChannel_hv;
      const webSocket = new WebSocket(`${WsUrl_chat}${hv}/`);
      MyWebSocket.push({ ch_hv: hv, wb: webSocket });
      webSocket.onopen = () => {
        webSocket.send(
          JSON.stringify({
            authorization: at,
          }),
        );
      };
    }
  }, [UpdateChannel.lastAddedChannel_hv]);

  useEffect(() => {
    MyWebSocket.forEach(w => {
      if (w.ch_hv === Clicked_channel_hv) {
        setsocket(w.wb);
      }
      if (Clicked_channel_hv !== "" && w.ch_hv === Clicked_channel_hv) {
        w.wb.onmessage = message => {
          // 클라이언트로부터 메시지 수신 시
          const m = JSON.parse(message.data);
          if (m.message !== undefined && notifiSetting == true) {
            if (m.user_id !== MyProfile.id) {
              showNotification(m.username, m.message);
            }
          }
          dispatch(findUserDataInClickedChannel(m.user_id));
          props.receive(w.ch_hv, m);
          dispatch(UpdateChat());
        };
        w.wb.onerror = () => {
          console.log(event);
        };
      }
    });

    if (inputRef.current) {
      // enter 치면 chatbox 공백으로 초기화 됨
      inputRef.current.value = "";
      setmsg("");
    }
  }, [Clicked_channel_hv]);

  useEffect(() => {
    if (socket) {
      socket.send(
        JSON.stringify({
          message: File_name,
          //file: File,
        }),
      );
      window.alert("file 전송 성공");
    }
  }, [File_name]);
  //랜더링 시점 = notification 웹소켓 내용 변화시
  useEffect(() => {
    MyWebSocket.forEach(w => {
      // setsocket(w.wb);
      w.wb.onmessage = message => {
        const nm = JSON.parse(message.data);
        if (nm.message !== undefined && notifiSetting == true) {
          if (nm.user_id !== MyProfile.id) {
            showNotification(nm.username, nm.message);
          }
        }
        dispatch(findUserDataInClickedChannel(nm.user_id));
        props.receive(w.ch_hv, nm);
        dispatch(UpdateChat());
      };
    });
  }, [notifi]);
  useEffect(() => {
    console.log("4");
    if (socket) {
      socket.send(
        JSON.stringify({
          message: File_name,
        }),
      );
    }
  }, [File_name]);
  const sendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(socket);
    if (socket && msg !== "") {
      socket.send(
        JSON.stringify({
          message: msg,
        }),
      );
    }

    if (inputRef.current) {
      inputRef.current.value = "";
      setmsg("");
    }
  };
  const ChooseMention = (name: string, EditingMentionLength: number) => {
    if (inputRef.current) {
      // enter 치면 chatbox 공백으로 초기화 됨
      const CurrentInput = inputRef.current.value;
      inputRef.current.value = CurrentInput.substring(0, CurrentInput.length - EditingMentionLength) + "@" + name + " ";
      setmsg(inputRef.current.value);
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
        {showMentionModal && <ChatMentionModal inputMsg={mentionName} Choose={ChooseMention} CalleverDataArr={Clicked_channel.members} />}
      </form>
    </ChatInputContainer>
  );
};

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
