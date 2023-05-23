import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const UpdateChannelSlice = createSlice({
  name: "UpdateChannel",
  initialState: {
    title: ["test"],
    lastDeleteChannel_hv: "",
    lastAddedChannel_hv: "",
  },
  reducers: {
    Update: state => {
      state.title.push("asdf");
      state.title.pop();
    },
    ConnectWebSocketAddedChannel: (state, action: PayloadAction<string>) => {
      const AddedChannel_hv = action.payload;
      state.lastAddedChannel_hv = AddedChannel_hv;
    },
    SaveDeleteChannel_hv: (state, action: PayloadAction<string>) => {
      const DeletedChannel_hv = action.payload;
      state.lastDeleteChannel_hv = DeletedChannel_hv;
    },
  },
});

export const { Update, ConnectWebSocketAddedChannel, SaveDeleteChannel_hv } = UpdateChannelSlice.actions;

export default UpdateChannelSlice.reducer;
