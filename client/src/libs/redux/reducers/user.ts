import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  isLogin: boolean;
  id?: string;
  name?: string;
  permissions?: ("Read" | "Create" | "Delete" | "Update")[];
}
interface ILoginAction {
  id: string;
  name: string;
  permissions: ("Read" | "Create" | "Delete" | "Update")[];
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
    update: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export const userReducer = userSlice.reducer;
