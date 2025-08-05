import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWords = createAsyncThunk(
  'words/fetchWords',
  async ({ page, search, category, verbType }) => {
    const { data } = await axios.get('/api/words', {
      params: { page, search, category, verbType },
    });
    return data;
  }
);

export const addWord = createAsyncThunk(
  'words/addWord',
  async (newWord) => {
    const { data } = await axios.post('/api/words', newWord);
    return data;
  }
);

export const editWord = createAsyncThunk(
  'words/editWord',
  async ({ id, updates }) => {
    const { data } = await axios.patch(`/api/words/${id}`, updates);
    return data;
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (id) => {
    await axios.delete(`/api/words/${id}`);
    return id;
  }
);

const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    items: [],
    page: 1,
    totalPages: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, state => { state.status = 'loading'; })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.words;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.words;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(editWord.fulfilled, (state, action) => {
        const idx = state.items.findIndex(w => w.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.items = state.items.filter(w => w.id !== action.payload);
      });
  },
});

export default wordsSlice.reducer;

