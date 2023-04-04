import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ClickedChannelReducer from "../variable/ClickedChannelSlice";
import UpdateChannelReducer from "../variable/UpdateChannelSlice";
import UpdateChatContextReducer from "../variable/UpdateChatContextSlice";
import WorkSpaceReducer from "../variable/WorkSpaceSlice";
import OnModalReducer from "../variable/OnModalSlice";
import MyProfileReducer from "../variable/MyProfileSlice";
import ChatBookmarkReducer from "../variable/ChatBookmarkSlice";
import StatusSliceReducer from "../variable/StatusSlices";
import ChatSliceReducer from "../variable/ChatSlice";

export const store = configureStore({
  reducer: {
    ClickedChannel: ClickedChannelReducer,
    UpdateChannel: UpdateChannelReducer,
    UpdateChatContext: UpdateChatContextReducer,
    getMyWorkSpace: WorkSpaceReducer,
    clearWorkSpace: WorkSpaceReducer,
    OnModal: OnModalReducer,
    getMyProfile: MyProfileReducer,
    ChatBookmark: ChatBookmarkReducer,
    ClickedStatus: StatusSliceReducer,
    Chat: ChatSliceReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
