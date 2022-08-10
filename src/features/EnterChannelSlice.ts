import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface enterRoomState {
    roomId: number;
}

const initialState: enterRoomState = {
    roomId: 0,
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
export const selectRoomId: number = 3;

export default EnterRoomSlice.reducer;
