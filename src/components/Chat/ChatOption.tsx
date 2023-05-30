import { PushpinOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ChatType, SendReactionType } from "../../types/types";
import { at, backUrl, WsUrl_reaction } from "../../variable/cookie";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkPage } from "../../variable/ChatBookmarkSlice";
import { ClickBookMark, saveReaction } from "../../variable/ClickedChannelSlice";
import { EditChatBookmark, UpdateReactionChatType2 } from "../../variable/WorkSpaceSlice";
import { RootState } from "../../app/store";
import downloadFile from "../fileDownload";
const ChatOption = (chat: ChatType) => {
  const [showDetail, setShowDetail] = useState<number>(-1);
  const chat_channel_hashed_value = useSelector((state: RootState) => state.ClickedChannel.channelData.hashed_value);
  const dispatch = useDispatch();
  const cidToInt = parseInt(chat.id);
  const PlayChatBookmark = () => {
    dispatch(getBookmarkPage());
    dispatch(ClickBookMark(chat.id));
    dispatch(EditChatBookmark(chat));
  };
  const cid = parseInt(chat.id);
  const [reactionSocket, setReactionSocket] = useState<WebSocket>();
  const formatArr: string[] = ["JPG", "JPEG", "PNG", "PDF", "TXT", "ZIP", "PY", "C", "TS", "TSX"];

  const DeleteChatBookmark = async () => {
    //chat/bookmark에 들어가는 chat_id는 다른 데이터구조(string)과는 달리 number라 형변환
    await axios
      .delete(`${backUrl}chat/bookmark/${cidToInt}/`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      })
      .then(res => {
        console.log(res);
        PlayChatBookmark();
      })
      .catch(err => {
        console.log(err);
      });
  };
  //누르면 ClickBookMark(cid) -> 해당 챗의 id 로 has_bookmarked 상태값 변경하기
  const MakeChatBookmark = async () => {
    //chat/bookmark에 들어가는 chat_id는 다른 데이터구조(string)과는 달리 number라 형변환
    await axios
      .post(
        `${backUrl}chat/bookmark/`,
        {
          chat_id: cidToInt,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        PlayChatBookmark();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const sendReaction = async (sendType: SendReactionType) => {
    const ReactionWs = new WebSocket(`${WsUrl_reaction}${chat_channel_hashed_value}/`);
    if (ReactionWs) {
      ReactionWs.onopen = async () => {
        await ReactionWs.send(
          JSON.stringify({
            authorization: at,
          }),
        );
        await ReactionWs.send(
          JSON.stringify({
            mode: sendType.mode,
            icon: sendType.icon,
            chat_id: sendType.chat_id,
          }),
        );
        await ReactionWs.close();
      };
    }
  };

  function ReactionLogic(clickedIcon: string, cid: number) {
    if ((chat.reactions || "").length === 0) {
      //리액션이 없을때 새로운 리액션을 추가
      sendReaction({ mode: "create", icon: clickedIcon, chat_id: cid });
    } else {
      // 리액션이 있을때 같은 리액션을 누르면 삭제
      sendReaction({ mode: "delete", icon: clickedIcon, chat_id: cid });
    }
  }

  const ChatOptionDetailArray = [
    {
      detailMessage: chat.has_bookmarked ? "UnChatBookmark" : "ChatBookmark",
      func: () => {
        if (!chat.has_bookmarked) {
          MakeChatBookmark();
        } else {
          DeleteChatBookmark();
        }
      },
      Icon: <PushpinOutlined />,
    },
    {
      //detailMessage: icon.match("👀") ? "you already signed" : "Sign as shown",
      detailMessage: "Sign as shown",
      func: () => {
        ReactionLogic("👀", cid);
      },
      Icon: "👀",
    },
    {
      detailMessage: "Sign as shown",
      func: () => {
        ReactionLogic("👍", cid);
      },
      Icon: "👍",
    },

    {
      detailMessage: "DownloadFile",
      func: () => {
        if (chat.message.match("." && "/")) {
          const format = (chat.message || "").split(".")[1].split("/")[0].toUpperCase();
          const file_id = Number((chat.message || "").split("/")[1]);
          console.log(format, file_id);
          if (formatArr.indexOf(format) > -1) {
            downloadFile(file_id);
          }
        }
      },
      Icon: "📁",
    },
  ];
  return (
    <>
      <div>
        {ChatOptionDetailArray &&
          ChatOptionDetailArray.map((ChatOptionDetail, i) => {
            return (
              <Option
                key={i}
                onClick={() => {
                  ChatOptionDetail.func();
                }}
                onMouseOver={() => {
                  setShowDetail(i);
                }}
                onMouseLeave={() => {
                  setShowDetail(-1);
                }}
              >
                {showDetail === i && (
                  <label>
                    <ChatOptionDetailMessage de={ChatOptionDetail.detailMessage} />
                  </label>
                )}
                {ChatOptionDetail.Icon}
              </Option>
            );
          })}
      </div>
    </>
  );
};

export default ChatOption;

const Option = styled.span`
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  height: 36px;
  width: 120px;
  border: none;
  background: #5e41de33;
  border-radius: 20px;
  cursor: pointer;

  .label {
    line-height: 20px;
    font-size: 17px;
    color: #5d41de;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  :hover {
    text-underline-colorcolor: black;
    cursor: pointer;
    opacity: 0.6;
    background-color: #9ca3af;
  }

  //.button:hover .svg-icon {
  //  animation: spin 2s linear infinite;
  //}
`;

const ChatOptionDetailMessage = (props: any) => {
  return <>{props.de}</>;
};
