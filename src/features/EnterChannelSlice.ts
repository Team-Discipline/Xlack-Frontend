import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface enterRoomState {
    roomId: number;
}

const initialState: enterRoomState = {
    roomId: -1,
};
export const EnterRoomSlice = createSlice({
    name: 'enterRoom',
    initialState,
    reducers: {
        enterRoom: (state, action: PayloadAction<number>) => {
            state.roomId = action.payload;
        },
    },
});

export const {enterRoom} = EnterRoomSlice.actions;
export default EnterRoomSlice.reducer;
