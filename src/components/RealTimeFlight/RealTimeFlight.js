import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { fetchFlightCoords } from '../../redux/slices/realTimeFlightSlice';
import Map from '../GoogleMap/Map';
import Spinner from '../../UI/Spinner/Spinner';
import styles from './RealTime.module.scss';

export default function RealTimeFlight() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const flightCoordsData = useSelector((state) => state.realtime.flightCoords);
  const dataByFlat = flightCoordsData.flat();

  let latitude = dataByFlat.map(({ lat }) => lat);
  let longitude = dataByFlat.map(({ lng }) => lng);
  let dir = dataByFlat.map(({ dir }) => dir);
  let speed = dataByFlat.map(({ speed }) => speed);
  let status = dataByFlat.map(({ status }) => status);
  let regNumber = dataByFlat.map(({ reg_number }) => reg_number);

  const { isLoaded } = useJsApiLoader({
    id: 'carbon-compound-410010',
    googleMapsApiKey: 'AIzaSyCCD7QbQzVB59baCDDcOR__4xebQq3BkwA',
  });
  useEffect(() => {
    if (latitude.length > 0) {
      const timer = setInterval(() => {
        dispatch(fetchFlightCoords(id));
      }, 10000);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line
  }, [latitude]);
  return (
    <div className={styles.container}>
      {latitude.length < 1 ? (
        <h2 className={styles['flight-info-header']}>
          No info about - <span> {id} </span>
        </h2>
      ) : (
        <h2 className={styles['flight-info-header']}>
          Here is information about - <span>{id}</span>
        </h2>
      )}
      {isLoaded ? (
        <Map
          latitude={latitude}
          longitude={longitude}
          dir={dir}
          speed={speed}
          regNumber={regNumber}
          status={status}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
