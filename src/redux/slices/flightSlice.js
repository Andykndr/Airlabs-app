import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  flight: [],
  loadingStatus: 'idle',
};

export const fetchFlight = createAsyncThunk(
  'iata/fetchFlight',
  async (code) => {
    const res = await axios.get(
      `https://airlabs.co/api/v9/flight?flight_iata=${code}&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
    );
    return res.data.error ? 'errorWithWrongCode' : res.data.response;
  }
);

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlight.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchFlight.fulfilled, (state, action) => {
        state.flight = [];
        state.flight.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchFlight.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export default flightSlice.reducer;
