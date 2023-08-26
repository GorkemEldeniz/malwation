import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  isLogin: boolean;
  id?: string;
  name?: string;
  permissions?: string[];
}
interface ILoginAction {
  id: string;
  name: string;
  permissions: string[];
}

const initialState: IUser = { isLogin: false };

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginAction>) => {
      return {
        isLogin: true,
        ...action.payload,
      };
    },
    logout: () => {
      return {
        isLogin: false,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
