import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  scheduleDep: [],
  scheduleArr: [],
  loadingStatus: 'idle',
};

export const fetchScheduleDep = createAsyncThunk(
  'scheduleDep/fetchScheduleDep',
  async (code) => {
    const res = await axios.get(
      `https://airlabs.co/api/v9/schedules?dep_iata=${code}&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
    );
    return res.data.error ? 'errorWithWrongCodeDep' : res.data.response;
  }
);
export const fetchScheduleArr = createAsyncThunk(
  'scheduleArr/fetchScheduleArr',
  async (code) => {
    const res = await axios.get(
      `https://airlabs.co/api/v9/schedules?arr_iata=${code}&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
    );
    return res.data.error ? 'errorWithWrongCodeArr' : res.data.response;
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleDep.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchScheduleDep.fulfilled, (state, action) => {
        state.scheduleDep = [];
        state.scheduleDep.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchScheduleDep.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchScheduleArr.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchScheduleArr.fulfilled, (state, action) => {
        state.scheduleArr = [];
        state.scheduleArr.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchScheduleArr.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export default scheduleSlice.reducer;
