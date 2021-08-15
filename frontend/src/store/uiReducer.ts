import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface uiState {

  passiveLoading: boolean;
  criticalLoading: boolean;
  actionLoading: boolean;
}
const initialState: uiState = {

  passiveLoading: false,
  criticalLoading: false,
  actionLoading: false
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsPassiveLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        passiveLoading: action.payload
      };
    },
    setIsCriticalLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        criticalLoading: action.payload
      };
    },
    setIsActionLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        actionLoading: action.payload
      };
    }
  }
});


export const { setIsPassiveLoading, setIsCriticalLoading, setIsActionLoading } = uiSlice.actions;

export default uiSlice.reducer;


// Selectors
export const getUi = (state: { ui: uiState }) => state.ui;