import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfoSlice {
  darkMode: boolean;
  userDetails: object;
}

const initialState: UserInfoSlice = {
  darkMode: false,
  userDetails: {},
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    dark: (state) => {
      state.darkMode = true;
    },
    light: (state) => {
      state.darkMode = false;
    },
    userDetails: (state, action: PayloadAction<object>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { dark, light, userDetails } = userInfoSlice.actions;

export default userInfoSlice.reducer;
