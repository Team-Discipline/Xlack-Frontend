import {createSlice, PayloadAction} from '@reduxjs/toolkit';




export const AddChannelSlice=createSlice({
    name :'AddChannel',
    initialState: {
        title:['test'],
    },
    reducers:{
        addRoom: (state,action: PayloadAction<string>)=>{
           state.title.push(action.payload)
        },
        
    },
});

export const {addRoom} = AddChannelSlice.actions;


export default AddChannelSlice.reducer;