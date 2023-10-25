import { configureStore, createSlice } from "@reduxjs/toolkit";

let checkedPokemon = createSlice({
    name: 'checkedPokemon',
    initialState: [],
    reducers: {
        checkedHandler(){
            
        }
    }
})

export let {checkedHandler} = checkedPokemon.actions;

export default configureStore({
    reducer: {
        checkedPokemon: checkedPokemon.reducer,
    }
})