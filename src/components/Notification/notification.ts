import { useEffect, useState } from "react";
import { at, WsUrl_notification } from "../../variable/cookie";
import { useDispatch } from "react-redux";
import { getChannel, CompleteGetUnReadChannel } from "../../variable/UnreadChannelSlice";

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
    };
    notifiSocket.onmessage = res => {
      const unReadChannel = JSON.parse(res.data).notifications;
      if (unReadChannel !== "undefined" || unReadChannel !== null) {
        // FIXME: null 값에 할당함
        Object.keys(unReadChannel).forEach((key: any) => {
          const setNotifications = unReadChannel;
          dispatch(getChannel(setNotifications[key]));
        });
        dispatch(CompleteGetUnReadChannel());
      }
    };
  }
}
export function showNotification(title: string, message: string) {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }
  // 사용자가 알림 권한을 허용했는지 확인합니다.
  if (Notification.permission === "granted") {
    // 알림을 생성합니다.
    const notification = new Notification(title, {
      body: message,
      // position: message,
      icon: "/path/to/icon.png",
      dir: "rtl",
    });
  } else if (Notification.permission !== "denied") {
    // 알림 권한이 없는 경우 권한을 요청합니다.
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        // 알림을 생성합니다.
        const notification = new Notification(title, {
          body: message,
          icon: "/path/to/icon.png",
        });
      }
    });
  }
}
