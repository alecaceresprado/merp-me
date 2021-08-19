import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import set from 'lodash.set';

export interface characterState {
  characters?: Character[];
  selecterCharacter?: string;
}

export interface Character {
  id: string;
  imgUrl: string;
  owner: string;
  createdAt: string;
  details: {
    age: string;
    alignment: string;
    class: string;
    experience: string;
    eyes: string;
    family: string;
    gender: string;
    hair: string;
    height: string;
    highlight: string;
    level: string;
    motivation: string;
    name: string;
    personality: string;
    player: string;
    race: string;
    status: string;
  }
}

const initialState: characterState = {}

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      return {
        characters: action.payload
      }
    },
    setSelecterCharacter: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selecterCharacter: action.payload
      }
    },
    updateCharacterProp:(state, action: PayloadAction<{id: string, value: string}>) => {
      const {id, value} = action.payload;
      const idArr = id.split('.');
      const newState =  {
        ...state,
        characters: state.characters?.map((character: Character) => {
          if(character.id === state.selecterCharacter) {
            const newChar = Object.assign({}, character);
            set(newChar, idArr, value);
            return character;
          } else {
            return character;
          }
        })
      }
      return state;
    },
  }
});


export const { setCharacters, setSelecterCharacter, updateCharacterProp } = characterSlice.actions;

export default characterSlice.reducer;


// Selectors
export const getCharacter = (state: { character: characterState }) => state.character;
export const getSelectedCharacter = ({ character: { characters, selecterCharacter } }: { character: characterState }) => characters?.find(char => char.id === selecterCharacter);