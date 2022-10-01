import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const UpdateChannelSlice = createSlice({
    name: 'UpdateChannel',
    initialState: {
        title: ['test'],
    },
    reducers: {
        UpdateRoom: state => {
            state.title.push('asdf');
            state.title.pop();
        },
    },
});

export const {UpdateRoom} = UpdateChannelSlice.actions;

export default UpdateChannelSlice.reducer;
