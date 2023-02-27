import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "../types/types";

interface struct {
  ChatBookmarkData: ChatType[];
  ClickBookmark: boolean;
}

const initialState: struct = {
  ChatBookmarkData: [],
  ClickBookmark: false,
};
export const ChatBookmarkSlice = createSlice({
  name: "ChatBookmark",
  initialState,
  reducers: {
    getChatBookmark: (state, action: PayloadAction<ChatType[]>) => {
      state.ChatBookmarkData = action.payload;
    },
    setClickBookmark: (state, action: PayloadAction<boolean>) => {
      state.ClickBookmark = action.payload;
    },
  },
});

export const { getChatBookmark, setClickBookmark } = ChatBookmarkSlice.actions;

export default ChatBookmarkSlice.reducer;
