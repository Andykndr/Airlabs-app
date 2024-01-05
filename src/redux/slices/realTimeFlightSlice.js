import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  flightCoords: [],
  loadingStatus: 'idle',
};

export const fetchFlightCoords = createAsyncThunk(
  'flightCoords/fetchFlightCoords',
  async (code) => {
    const res = await axios.get(
      `https://airlabs.co/api/v9/flights?flight_iata=${code}&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
    );
    // console.log(res.data.error ? 'errorWithWrongCode' : res.data);
    return res.data.error ? 'errorWithWrongCode' : res.data.response;
  }
);

const realTimeFlightSlice = createSlice({
  name: 'flightCoords',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlightCoords.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchFlightCoords.fulfilled, (state, action) => {
        state.flightCoords = [];
        state.flightCoords.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchFlightCoords.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export default realTimeFlightSlice.reducer;
