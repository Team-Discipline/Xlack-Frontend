import { createSlice } from "@reduxjs/toolkit";

export const UpdateChatContext = createSlice({
  name: "UpdateChannel",
  initialState: {
    receiveMessage: false, // 바뀌면 새로운 메세지가 수신되었다는 것
  },
  reducers: {
    UpdateChat: (state) => {
      state.receiveMessage = !state.receiveMessage;
    },
  },
});

export const { UpdateChat } = UpdateChatContext.actions;

export default UpdateChatContext.reducer;
