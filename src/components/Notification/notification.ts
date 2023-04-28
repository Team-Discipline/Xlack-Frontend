import { useEffect, useState } from "react";
import { at, WsUrl_chat, WsUrl_notification } from "../../variable/cookie";
import { useDispatch, useSelector } from "react-redux";
import { getChannel, CompleteGetUnReadChannel } from "../../variable/UnreadChannelSlice";
import Chat from "../Chat/Chat";
import { rightClick_channel } from "../../variable/WorkSpaceSlice";
import { setClickedChannel } from "../../variable/ClickedChannelSlice";
import { RootState } from "../../app/store";
import { ChatChannelType } from "../../types/types";

export function Notifi() {
  const [notifiSocket, setNotifiSocket] = useState<WebSocket>();
  const dispatch = useDispatch();
  useEffect(() => {
    setNotifiSocket(new WebSocket(`${WsUrl_notification}`));
  }, [at]);
  if (notifiSocket) {
    notifiSocket.onopen = () => {
      notifiSocket.send(
        JSON.stringify({
          authorization: at,
        }),
      );
      console.log("알림 웹소켓 연결");
    };
    notifiSocket.onmessage = res => {
      const unReadChannel = JSON.parse(res.data).notifications;
      if (unReadChannel !== "undefined" || unReadChannel !== null) {
        Object.keys(unReadChannel).forEach((key: any) => {
          const setNotifications = unReadChannel;
          dispatch(getChannel(setNotifications[key]));
        });
        dispatch(CompleteGetUnReadChannel());
      }
    };
  }
}
export function showNotification(title: string, message: string, ch: string) {
  // const search_channel = useSelector((state: RootState) => state.getMyWorkSpace.SearchedChannel);
  const dispatch = useDispatch();
  // const [MyWebSocket, setMyWebSocket] = useState<{ ch_hv: string; wb: WebSocket }[]>([]);
  const handleClick = (event: any) => {
    console.log("알림 클릭 event, ch", event, ch);
    dispatch(setClickedChannel(event.data.ch_hv));
    const channel_hv = ch;
    const webSocket = new WebSocket(`${WsUrl_chat}${channel_hv}/`);
    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({
          channel_hashed_value: { channel_hv },
        }),
      );
    };
    console.log(event.data);
  };
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }
  // 사용자가 알림 권한을 허용했는지 확인합니다.
  if (Notification.permission === "granted") {
    // 알림을 생성합니다.
    // 브라우저가 제일 위에서 실행되고 있지 않을 때만 알림 실행
    if (!document.hasFocus()) {
      // 알림을 보내는 로직
      const notification = new Notification(title, {
        body: message,
        // position: message,
        data: ch,
        icon: "/path/to/icon.png",
        dir: "rtl",
      });
      notification.addEventListener("click", handleClick);
    }
  } else if (Notification.permission !== "denied") {
    // 알림 권한이 없는 경우 권한을 요청합니다.
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        if (!document.hasFocus()) {
          // 알림을 보내는 로직
          const notification = new Notification(title, {
            body: message,
            // position: message,
            data: ch,
            icon: "/path/to/icon.png",
            dir: "rtl",
          });
          notification.addEventListener("click", handleClick);
        }
      }
    });
  }
}
