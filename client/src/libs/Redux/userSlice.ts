import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  id?: string;
  name?: string;
  active?: boolean;
  permissions?: string[];
  password?: string;
  createdAt?: number;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      return {
        ...action.payload,
      };
    },
    logout: () => {
      return {
        isAuth: false,
      };
    },
    update: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, update } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
