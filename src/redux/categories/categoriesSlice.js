import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../constants/categories"; 


const initialState = {
    items: categories,   
    isLoading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories", 
    initialState,
    reducers: {},
});

export const categoriesReducer = categoriesSlice.reducer;

