import { configureStore, createSlice } from "@reduxjs/toolkit";

let checkedPokemon = createSlice({
    name: 'checkedPokemon',
    initialState: [],
    reducers: {
        handleClick(state, action){
            if(state.includes(action.payload)){
                const originalState = state;
                const newState = originalState.filter(item => item != action.payload); 
                return newState;
            }
            else{
                return [...state, action.payload];
            }
            
        }
    }
});

export let { handleClick } = checkedPokemon.actions

export default configureStore({
    reducer: {
        checkedPokemon: checkedPokemon.reducer
    }
});