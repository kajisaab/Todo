import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDetailState {
  darkMode: boolean;
  userDetails: any;
  token: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserDetailState = {
  darkMode: false,
  token: '',
  userDetails: {},
  status: 'idle',
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    viewMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },

    tokenRegistration: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    userDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = { ...action.payload };
    },
  },
});

export const { viewMode, tokenRegistration, userDetails } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
