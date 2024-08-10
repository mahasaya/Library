import { createSlice } from "@reduxjs/toolkit";

export const LibrarySlice = createSlice({
    name:"library",
    initialState:[],
    reducers:{
        add:(state,action)=>{
            state.push(action.payload)
        },
        remove:(state,action)=>{
            return state.filter((item)=> item.id !== action.payload)
        }
    },
})

export const {add, remove}=LibrarySlice.actions;
export default LibrarySlice.reducer