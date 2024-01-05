import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  iata: [],
  loadingStatus: 'idle',
};

export const fetchIata = createAsyncThunk('iata/fetchIata', async (code) => {
  const res = await axios.get(
    `https://airlabs.co/api/v9/airports?city_code=${code}&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
  );
  return res.data.response <= 0 ? 'noOneAirport' : res.data.response;
});

//The first time I did it like this, but I could not catch the error when there was a refusal in geolocation.

// export const fetchIataViaGeo = createAsyncThunk(
//   'iata/fetchIataViaGeo',
//   async () => {
//     const error = () => {
//       alert('Sorry, we could not find your location.');
//     };
//     const success = async (position) => {
//       let lat = position.coords.latitude;
//       let lng = position.coords.longitude;

//       try {
//         const res = await axios.get(
//           `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=45&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
//         );
//         console.log(res.data);

//         return await res.data.response.airports;
//       } catch (err) {
//         error();
//         console.error(err);
//       }
//     };
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     }).then(success, error);
//   }
// );

//This is the code from Stackoverflow
export const fetchIataViaGeo = createAsyncThunk(
  'iata/fetchIataViaGeo',
  async (_, { rejectWithValue }) => {
    const handleError = () => {
      alert('Sorry, we could not find your location.');
      return rejectWithValue('Error');
    };

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const res = await axios.get(
        `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=45&api_key=c0068cd7-aa80-43ee-aa6d-00221b492a5d`
      );

      return await res.data.response.airports;
    } catch (err) {
      console.error(err);
      return handleError();
    }
  }
);

const iataSlice = createSlice({
  name: 'iata',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIata.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchIata.fulfilled, (state, action) => {
        state.iata = [];
        state.iata.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchIata.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchIataViaGeo.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchIataViaGeo.fulfilled, (state, action) => {
        state.iata.push(action.payload);
        state.loadingStatus = 'idle';
      })
      .addCase(fetchIataViaGeo.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

export const { addIATA, getIATARequested, errorIata } = iataSlice.actions;

export default iataSlice.reducer;
