import {configureStore} from '@reduxjs/toolkit';
import EnterRoomReducer from '../features/EnterChannelSlice';
import UpdateChannelReducer from '../features/UpdateChannelSlice';
import UpdateChatContextReducer from '../features/UpdateChatContextSlice';

export const store = configureStore({
    reducer: {
        enterRoom: EnterRoomReducer,
        UpdateChannel: UpdateChannelReducer,
        UpdateChatContext: UpdateChatContextReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
