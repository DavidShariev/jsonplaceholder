import { createSlice } from '@reduxjs/toolkit';

interface IInitialState{
    visibilityMode: boolean
}

const initialState: IInitialState = {
    visibilityMode: false
}

const visibilitySlice = createSlice({
    name: "visibilitySlice",
    initialState,
    reducers: {
        changeMode(state){
            state.visibilityMode = !state.visibilityMode
        }
    }
})

export const { changeMode } = visibilitySlice.actions;
export default visibilitySlice.reducer;
