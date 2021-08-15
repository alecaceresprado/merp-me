import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface characterState {

}
const initialState: characterState = {}

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<characterState>) => {
      state = {
        ...action.payload
      }
    }
  }
});


export const { setCharacter } = characterSlice.actions;

export default characterSlice.reducer;


// Selectors
export const getCharacter = (state: characterState) => state;