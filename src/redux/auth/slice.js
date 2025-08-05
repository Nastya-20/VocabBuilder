import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, signout, currenthUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      password: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(currenthUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(currenthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
        .addCase(currenthUser.rejected, (state) => {
            state.isRefreshing = false;
            state.token = null;
            state.user = { name: null, email: null };
            state.isLoggedIn = false;
        });
  },
});

export const authReducer = authSlice.reducer;
