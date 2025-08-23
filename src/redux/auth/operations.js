import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://vocab-builder-backend.p.goit.global/api';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/signin
 * body: { email, password }
 */

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signin', credentials);

      setAuthHeader(data.token);

      toast.success('Login successful!');
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';

      toast.error(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/signout
 * headers: Authorization: Bearer token
 */
export const signout = createAsyncThunk(
  'auth/signout',
  async (_, thunkAPI) => {
  try {
    await axios.post('/users/signout');
    clearAuthHeader();
    localStorage.removeItem('token');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const currenthUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
     const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
       return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
