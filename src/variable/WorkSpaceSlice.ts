import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatChannelType, ChatType, WorkspaceType } from "../types/types";
import { at, WsUrl_chat } from "./cookie";

interface struct {
  MyWorkSpace: WorkspaceType[];
  rightClicked_channel_hashed_value: string;
  ClickedWorkSpace_hashed_value: string;
  ClickedWorkSpace: WorkspaceType;
  SearchedChannel: ChatChannelType;
  WebSocket: [string, WebSocket][];
}

const initialState: struct = {
  MyWorkSpace: [],
  rightClicked_channel_hashed_value: "",
  ClickedWorkSpace_hashed_value: "",
  ClickedWorkSpace: {
    created_at: "",
    updated_at: "",
    members: [],
    chat_channel: [],
    hashed_value: "",
    name: "",
  },
  SearchedChannel: {
    id: -1,
    name: "default",
    hashed_value: "",
    description: "",
    Chats: [],
    members: [],
    admins: [],
  },
  WebSocket: [],
};

export const WorkSpaceSlice = createSlice({
  name: "getMyWorkSpace",
  initialState,
  reducers: {
    getWorkSpace: (state, action: PayloadAction<WorkspaceType>) => {
      const m = action.payload;
      state.MyWorkSpace.push({
        created_at: m.created_at,
        updated_at: m.updated_at,
        members: m.members,
        chat_channel: m.chat_channel,
        hashed_value: m.hashed_value,
        name: m.name,
      });
    },
    clearWorkSpace: state => {
      state.MyWorkSpace = [];
    },
    //현재 내가 클릭한 워크스페이스
    getChannelList: (state, action: PayloadAction<ChatChannelType[]>) => {
      state.ClickedWorkSpace.chat_channel = action.payload;
    },
    SetClickedWorkSpace: (state, action: PayloadAction<string>) => {
      state.ClickedWorkSpace_hashed_value = action.payload;
    },

    CallClickedWorkSpace: (state, action: PayloadAction<void>) => {
      const w = state.ClickedWorkSpace_hashed_value;
      state.MyWorkSpace.forEach(value => {
        if (value.hashed_value === w) {
          state.ClickedWorkSpace = value;
        }
      });
    },
    //현재 워크스페이스에서 channel.hashed_value를 이용해 channel의 정보 찾기
    SearchChannel: (state, action: PayloadAction<void>) => {
      const r = state.rightClicked_channel_hashed_value;
      state.ClickedWorkSpace.chat_channel?.forEach(value => {
        if (value.hashed_value === r) {
          state.SearchedChannel = value;
        }
      });
    },
    rightClick_channel: (state, action: PayloadAction<string>) => {
      state.rightClicked_channel_hashed_value = action.payload;
    },
    SaveChat: (state, action: PayloadAction<[ChatChannelType, ChatType[]]>) => {
      const channel = action.payload[0];
      const ChatArr = action.payload[1];
      state.MyWorkSpace.forEach(w => {
        w.chat_channel?.forEach(c => {
          if (c.hashed_value === channel.hashed_value) {
            c.Chats = ChatArr;
          }
        });
      });
    },
    ConnectWebSocket: (state, action: PayloadAction<string>) => {
      const channel_hv = action.payload;
      const webSocket = new WebSocket(`${WsUrl_chat}${channel_hv}/`);
      state.WebSocket.push([channel_hv, webSocket]);
      webSocket.onopen = () => {
        webSocket.send(
          JSON.stringify({
            authorization: at,
          }),
        );
        console.log("웹소켓 연결");
      };
    },
  },
});

export const { getWorkSpace, getChannelList, clearWorkSpace, SetClickedWorkSpace, CallClickedWorkSpace, SearchChannel, rightClick_channel, SaveChat, ConnectWebSocket } = WorkSpaceSlice.actions;
export default WorkSpaceSlice.reducer;
