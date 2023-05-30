import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatChannelType, ChatType, ReactionFetchType, WorkspaceType } from "../types/types";

interface struct {
  MyWorkSpace: WorkspaceType[];
  rightClicked_channel_hashed_value: string;
  ClickedWorkSpace: WorkspaceType;
  SearchedChannel: ChatChannelType;
  RedirectChannel: ChatChannelType | null;
  CompletegetWorkspace: boolean;
}

const initialState: struct = {
  MyWorkSpace: [],
  rightClicked_channel_hashed_value: "",
  ClickedWorkSpace: {
    created_at: "",
    updated_at: "",
    members: [],
    chat_channel: [],
    hashed_value: "",
    name: "Please Select WS",
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
  RedirectChannel: null,
  CompletegetWorkspace: false,
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
      state.ClickedWorkSpace.hashed_value = action.payload;
    },

    CallClickedWorkSpace: (state, action: PayloadAction<void>) => {
      const w = state.ClickedWorkSpace.hashed_value;
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
    SearchChannelInAll: (state, action: PayloadAction<void>) => {
      const r = state.rightClicked_channel_hashed_value;
      state.SearchedChannel.id = -2;
      state.ClickedWorkSpace = initialState.ClickedWorkSpace;
      //해당 value의 채널이 없을 시 초기값을 넣기 위해 초기화
      state.MyWorkSpace.forEach(w => {
        w.chat_channel?.forEach(value => {
          if (value.hashed_value === r) {
            state.SearchedChannel = value;
            state.ClickedWorkSpace = w;
          }
        });
      });
    },
    focusChannelByHv: (state, action: PayloadAction<string>) => {
      const hv = action.payload; // hashed value of channel
      state.ClickedWorkSpace = initialState.ClickedWorkSpace;
      //해당 value의 채널이 없을 시 초기값을 넣기 위해 초기화
      state.MyWorkSpace.forEach(w => {
        w.chat_channel?.forEach(channel => {
          if (channel.hashed_value === hv) {
            state.RedirectChannel = channel;
            state.ClickedWorkSpace = w;
          }
        });
      });
    },
    removeRedirectChannel: (state, action: PayloadAction<void>) => {
      state.RedirectChannel = null;
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
    AppendChat: (state, action: PayloadAction<[string, ChatType]>) => {
      const channel_hv = action.payload[0];
      const Chat = action.payload[1];
      state.MyWorkSpace.forEach((w, i) => {
        w.chat_channel?.forEach((c, x) => {
          if (c.hashed_value === channel_hv) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.MyWorkSpace[i].chat_channel[x].Chats.unshift(Chat);
          }
        });
      });
    },
    CompleteGetMyWorkspace: (state, action: PayloadAction<void>) => {
      state.CompletegetWorkspace = true;
    },
    EditChatBookmark: (state, action: PayloadAction<ChatType>) => {
      const chatInfo = action.payload;
      state.MyWorkSpace.forEach(w => {
        w.chat_channel?.forEach(channel => {
          if (channel.id === chatInfo.channel) {
            channel.Chats.forEach(chat => {
              if (chat.id === chatInfo.id) {
                chat.has_bookmarked = !chat.has_bookmarked;
              }
            });
          }
        });
      });
    },
    UpdateReactionChatType2: (state, action: PayloadAction<ReactionFetchType>) => {
      const reaction = action.payload;
      state.MyWorkSpace.forEach(w => {
        w.chat_channel?.forEach(c => {
          if (c.hashed_value === reaction.channel_hashed_value) {
            c.Chats?.forEach(chat => {
              if (Number(chat.id) === reaction.chat_id) {
                if (reaction.reactors?.length) {
                  chat.reactions = (chat.reactions || []).filter(reaction => reaction.icon !== reaction.icon);
                  (chat.reactions || []).push(reaction);
                } else {
                  chat.reactions = (chat.reactions || []).filter(reaction => reaction.icon !== reaction.icon);
                }
              }
            });
          }
        });
      });
    },
  },
});

export const {
  getWorkSpace,
  getChannelList,
  clearWorkSpace,
  SetClickedWorkSpace,
  CallClickedWorkSpace,
  SearchChannel,
  rightClick_channel,
  SaveChat,
  CompleteGetMyWorkspace,
  AppendChat,
  SearchChannelInAll,
  EditChatBookmark,
  UpdateReactionChatType2,
  focusChannelByHv,
  removeRedirectChannel,
} = WorkSpaceSlice.actions;
export default WorkSpaceSlice.reducer;
