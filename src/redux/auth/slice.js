import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, signout, currenthUser } from './operations';
import { clearAuthHeader } from '../../utils/auth';


const initialState = {
  user: { name: null, email: null },
  token: localStorage.getItem('token') || null,
  isLoggedIn: localStorage.getItem('token') !== null,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.error = null;
      })

      .addCase(signout.fulfilled, () => {
        localStorage.removeItem('token');
        return initialState;
      })
      .addCase(signout.rejected, (state, action) => {
         state.error = action.payload;
      })
      .addCase(currenthUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(currenthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
        .addCase(currenthUser.rejected, (state, action) => {
          state.error = action.payload;
          state.isRefreshing = false;
        });
  },
});


export const authReducer = authSlice.reducer;
