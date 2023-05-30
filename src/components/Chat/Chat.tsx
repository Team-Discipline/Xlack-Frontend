import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { ChatType, SocketReceiveChatType } from "../../types/types";
import { at, backUrl, WsUrl_notification } from "../../variable/cookie";
import axios from "axios";
import ChatContext from "./ChatContext";
import { AppendChat } from "../../variable/WorkSpaceSlice";
import WaitPage from "../../pages/WaitPage";
import { deleteChannel } from "../../variable/UnreadChannelSlice";

const Chat = () => {
  const notifi = useSelector((state: RootState) => state.UnReadChannel);
  const Clicked_channel = useSelector((state: RootState) => state.ClickedChannel.channelData);
  const Clicked_channel_hashedValue = useSelector((state: RootState) => state.ClickedChannel.channelData.hashed_value);
  const findUser = useSelector((state: RootState) => state.ClickedChannel.findUserData);
  const ClickedBookmark = useSelector((state: RootState) => state.ChatBookmark.ClickBookmark);
  const MyWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.MyWorkSpace);
  const currentWorkspace = useSelector((state: RootState) => state.getMyWorkSpace.ClickedWorkSpace);
  const UpdateChannel = useSelector((state: RootState) => state.UpdateChannel);
  const UpdateBookmark = useSelector((state: RootState) => state.ChatBookmark.UpdateBookmark);
  const [lastChat, setLastChat] = useState<any>("-1");
  const [socket, setSocket] = useState<WebSocket | undefined>();
  const receiveMessage = useSelector((state: RootState) => state.UpdateChatContext.receiveMessage);
  const dispatch = useDispatch();
  const messagesRef = useRef<any>();
  const [getChatData, setGetChatData] = useState<ChatType[]>([]);
  const receiveChatBookmarkData = async () => {
    try {
      const res = await axios.get(`${backUrl}workspace/bookmarked_chat/${currentWorkspace.hashed_value}/`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      //데이터 받을 때 created_at 형태 바꿔줄 필요 있음
      const c: ChatType[] = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      res.data.map(r => {
        c.push({
          id: r.id,
          chatter: r.chatter,
          channel: r.channel,
          has_bookmarked: true,
          message: r.message,
          created_at: r.created_at,
          converted_created_at: r.converted_created_at,
          reactions: r.reaction,
          file: r.file,
        });
      });
      setGetChatData(c);
    } catch (err) {
      console.log("receiveChatBookmarkError: ", err);
    }
  };
  useEffect(() => {
    if (lastChat !== "-1") {
      //웹소켓으로 받는 데이터로 Chat을 만들어 getChatData에 추가시키기
      setGetChatData([MakeChatDataFromLastChat(lastChat), ...getChatData]);
    }
  }, [lastChat]);
  useEffect(() => {
    if (Clicked_channel) setGetChatData(Clicked_channel.Chats);
  }, [Clicked_channel, UpdateBookmark]);

  useEffect(() => {
    if (ClickedBookmark) {
      receiveChatBookmarkData();
    }
  }, [ClickedBookmark, UpdateBookmark]);
  //채널 들어갔을 때 notification 웹소켓으로 받아온 데이터 삭제
  useEffect(() => {
    dispatch(deleteChannel(Clicked_channel_hashedValue));
  }, [Clicked_channel_hashedValue]);
  useEffect(() => {
    if (UpdateChannel.lastDeleteChannel_hv === Clicked_channel.hashed_value) setGetChatData([]);
  }, [UpdateChannel.lastDeleteChannel_hv]);
  useEffect(() => {
    if (Clicked_channel) setGetChatData(Clicked_channel.Chats);
    const webSocket = new WebSocket(`${WsUrl_notification}`);
    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          authorization: at,
        }),
      );
      webSocket.send(
        JSON.stringify({
          channel_hashed_value: Clicked_channel_hashedValue,
        }),
      );
      webSocket.send(
        JSON.stringify({
          refresh: true,
        }),
      );
    };
    webSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.channel_hashed_value === Clicked_channel_hashedValue) {
        webSocket.send(
          JSON.stringify({
            channel_hashed_value: Clicked_channel_hashedValue,
          }),
        );
        webSocket.send(
          JSON.stringify({
            refresh: true,
          }),
        );
      }
    };
    setSocket(webSocket);
  }, [Clicked_channel_hashedValue]);
  // useEffect(() => {
  //   if (lastChat !== "-1") {
  //     //웹소켓으로 받는 데이터로 Chat을 만들어 getChatData에 추가시키기
  //     setGetChatData([MakeChatDataFromLastChat(lastChat), ...getChatData]);
  //   }
  // }, [lastChat]);
  useEffect(() => {
    if (ClickedBookmark) {
      receiveChatBookmarkData();
    }
  }, [ClickedBookmark, UpdateBookmark]);

  useEffect(() => {
    if (UpdateChannel.lastDeleteChannel_hv === Clicked_channel.hashed_value) setGetChatData([]);
  }, [UpdateChannel.lastDeleteChannel_hv]);
  const MakeChatDataFromLastChat = (s: SocketReceiveChatType) => {
    const c: ChatType = {
      id: s.chat_id,
      channel: Clicked_channel.id,
      chatter: findUser,
      has_bookmarked: false,
      reactions: [],
      message: s.message,
      created_at: s.created_at,
      converted_created_at: s.created_at,
    };
    return c;
  };

  const ReceiveLastChat = (ch_hv: string, r: SocketReceiveChatType) => {
    try {
      if (r.chat_id != undefined) {
        dispatch(AppendChat([ch_hv, MakeChatDataFromLastChat(r)]));
      }

      //최근에 받아온 데이터를 redux에 저장한 channel의 챗에 추가
      if (ch_hv === Clicked_channel.hashed_value) {
        setLastChat(r);
      }
      //새로 온 메세지가 지금 보고 있는 채널이면 바로 갱신
    } catch (err) {
      console.log("ReceiveLastChatError: ", err);
    }
    //새로 온 메세지가 지금 보고 있는 채널이면 바로 갱신
  };

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [getChatData, receiveMessage]); //새로운 문자가 송신되어 receiveMessage가 true가 되면 챗 정보들 불러옴
  return (
    <ChatContainer>
      {/* {roomDetails && roomMessages && ( */}
      <>
        <ChatMessages ref={messagesRef}>
          {getChatData &&
            getChatData
              .slice(0)
              .reverse()
              .map((chat, i) => {
                return (
                  <span key={i}>
                    <ChatContext {...chat}></ChatContext>
                  </span>
                );
              })}
          {!getChatData && <WaitPage />}
        </ChatMessages>
        <ChatInput
          receive={(ch_hv: string, input: SocketReceiveChatType) => {
            ReceiveLastChat(ch_hv, input);
          }}
        />
      </>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  margin-bottom: 130px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div``;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    /* HelpOutlineIcon */
    margin-left: auto;
    margin-right: 20px;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;
