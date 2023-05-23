import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface struct {
  SendMessage: {
    //file: File | null;
    file_name: string | null;
  };
}

const initialState: struct = {
  SendMessage: {
    //file: null,
    file_name: null,
  },
};
export const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    // setFile: (state, action: PayloadAction<File>) => {
    //   state.SendMessage.file = action.payload;
    // },
    setFileName: (state, action: PayloadAction<string>) => {
      state.SendMessage.file_name = action.payload;
    },
  },
});

export const { setFileName } = ChatSlice.actions;
export default ChatSlice.reducer;
