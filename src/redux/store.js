import { configureStore } from '@reduxjs/toolkit';
import iataReducer from './slices/iataSlice';
import flightReducer from './slices/flightSlice';
import scheduleReducer from './slices/scheduleSlice';
import realTimeFlightReducer from './slices/realTimeFlightSlice';

const store = configureStore({
  reducer: {
    iata: iataReducer,
    flight: flightReducer,
    schedule: scheduleReducer,
    realtime: realTimeFlightReducer,
  },
});

export default store;
