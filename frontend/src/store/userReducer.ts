import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface userDetails {
  email: string;
  userId: string;
  userName: string;
  createdAt: string;
};
interface loginErrors {
  email?: string;
  password?: string;
  general?: string
};


export interface userState {
  userDetails?: userDetails;
  loginErrors?: loginErrors
};

const initialState: userState = {
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<userDetails>) => {
      return {
        ...state,
        userDetails: {
          ...action.payload
        }, 
        loginErrors: {},
      };
    },
    setLoginErrors: (state, action: PayloadAction<loginErrors>) => {
      return {
        ...state,
        loginErrors: {
          ...action.payload
        }
      };
    }
  },

});


export const { setUserDetails, setLoginErrors } = userSlice.actions;

export default userSlice.reducer;


// Selectors
export const getUser = (state: {user: userState}) => state.user;