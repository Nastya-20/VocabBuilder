import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatistics = createAsyncThunk(
    'statistics/fetch',
    async () => {
        const { data } = await axios.get('/api/statistics');
        return data;
    }
);

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        totalWords: 0,
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStatistics.pending, state => { state.status = 'loading'; })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalWords = action.payload.totalWords;
                state.tasks = action.payload.tasks;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default statisticsSlice.reducer;
