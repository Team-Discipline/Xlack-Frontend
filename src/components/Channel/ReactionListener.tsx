import { UpdateReactionChatType2 } from "../../variable/WorkSpaceSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { at, WsUrl_reaction } from "../../variable/cookie";
import { findUserDataInClickedChannel, saveReaction } from "../../variable/ClickedChannelSlice";

function ReactionListener() {
  const chat_channel_hashed_value = useSelector((state: RootState) => state.ClickedChannel.channelData.hashed_value);
  const dispatch = useDispatch();
  let socket: WebSocket | null = null;

  function refreshConnection() {
    if (socket) {
      socket.close();
    }
    socket = new WebSocket(`${WsUrl_reaction}${chat_channel_hashed_value}/`);
    socket.onopen = () => {
      socket?.send(
        JSON.stringify({
          authorization: at,
        }),
      );
    };
    socket.onmessage = res => {
      const data = JSON.parse(res.data);
      const reactionData = data?.reaction;
      if (reactionData) {
        dispatch(
          UpdateReactionChatType2({
            channel_hashed_value: chat_channel_hashed_value,
            id: reactionData.id,
            chat_id: reactionData.chat_id,
            icon: reactionData.icon,
            reactors: reactionData.reactors,
          }),
        );
        dispatch(
          saveReaction({
            channel_hashed_value: chat_channel_hashed_value,
            id: reactionData.id,
            chat_id: reactionData.chat_id,
            icon: reactionData.icon,
            reactors: reactionData.reactors,
          }),
        );
        dispatch(findUserDataInClickedChannel(reactionData.reactors[Number(reactionData.reactors.length)]));
      }
    };
  }

  useEffect(() => {
    if (chat_channel_hashed_value) {
      refreshConnection();
    }
  }, [chat_channel_hashed_value]);

  return null;
}

export default ReactionListener;
