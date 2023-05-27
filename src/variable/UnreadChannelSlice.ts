import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../types/types";

interface struct {
  UnReadChannel: Notification[];
  CompleteGetUnreadChannel: boolean;
}

const initialState: struct = {
  UnReadChannel: [],
  CompleteGetUnreadChannel: false,
};

export const UnReadChannelSlice = createSlice({
  name: "unReadChannel",
  initialState,
  reducers: {
    getChannel: (state, action: PayloadAction<Notification>) => {
      const notification = action.payload;

      const isDuplicateNotification = state.UnReadChannel.some(item => {
        return JSON.stringify(item) === JSON.stringify(notification);
      });

      if (!isDuplicateNotification) {
        // 채널을 읽은 경우 count를 undefined로 설정
        const count = notification.channel_hashed_value ? notification.count : undefined;
        state.UnReadChannel.push({
          channel_hashed_value: notification.channel_hashed_value,
          count,
          workspace_hashed_value: notification.workspace_hashed_value,
        });
        // state.UnReadChannel.push({
        //   channel_hashed_value: action.payload.channel_hashed_value,
        //   count: action.payload.count,
        //   workspace_hashed_value: action.payload.workspace_hashed_value,
        // });
      }
    },
    CompleteGetUnReadChannel: (state, action: PayloadAction<void>) => {
      state.CompleteGetUnreadChannel = true;
    },
    deleteChannel: (state, action: PayloadAction<string>) => {
      const channel_hashed_value = action.payload;
      const index = state.UnReadChannel.findIndex(channel => channel.channel_hashed_value === channel_hashed_value);
      if (index !== -1) {
        state.UnReadChannel.splice(index, 1);
      }
    },
  },
});

export const { getChannel, CompleteGetUnReadChannel, deleteChannel } = UnReadChannelSlice.actions;
export default UnReadChannelSlice.reducer;
