import { configureStore } from "@reduxjs/toolkit";
import { LibrarySlice}  from "./Slices/LibrarySlice";

export const store = configureStore({
    reducer:{
        library:LibrarySlice.reducer
    }
})