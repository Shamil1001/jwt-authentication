import { createSlice } from "@reduxjs/toolkit";

type authProps = {
  user: null | string;
  token: null | string;
};

const initialState: authProps = {
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;

export const selectCurrentUSer = (state: any) => state.auth.user;
