import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatistics = createAsyncThunk(
    'statistics/fetch',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth?.token; 
            
            const { data } = await axios.get('/words/statistics', {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            // якщо бекенд повертає порожню відповідь
            return data || { totalCount: 0, tasks: [] };
        } catch (error) {
            return rejectWithValue({ totalCount: 0, tasks: [] });
        }
    }
);

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        totalCount: 0,
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStatistics.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalCount = action.payload.totalCount || 0;
                state.tasks = action.payload.tasks || [];
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.totalCount = 0;
                state.tasks = [];
            });
    },
});

export default statisticsSlice.reducer;

