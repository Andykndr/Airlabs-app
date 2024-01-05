import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIata, fetchIataViaGeo } from '../../redux/slices/iataSlice';
import MyButton from '../../UI/MyButton/MyButton';
import MyInput from '../../UI/MyInput/MyInput';
import NearbyContent from './NearbyContent';
import Underline from '../../UI/uderline/Underline';

import styles from './NearbyAirport.module.scss';

export default function NearbyAirport() {
  const [cityCode, setCityCode] = useState('');
  const dispatch = useDispatch();

  const loadStatus = useSelector((state) => state.iata.loadingStatus);

  const getGeoLocation = (e) => {
    e.preventDefault();
    dispatch(fetchIataViaGeo());
  };

  const getSubmitViaIata = (e, code) => {
    e.preventDefault();
    if (code) {
      dispatch(fetchIata(code));
      setCityCode('');
    }
  };

  return (
    <div className={styles['nearby-airport-block']}>
      <div className={styles['nearby-header']}>Nearby Airport</div>
      <Underline />
      <div className={styles['nearby-form']}>
        <form onSubmit={(e) => getSubmitViaIata(e, cityCode)}>
          <div className={styles['nearby-search-block']}>
            <MyInput
              type="text"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              id="iata"
              label="City code (IATA) : "
              placeholder="write your city"
            />
            or
            <MyButton
              disabled={loadStatus === 'loading'}
              onClick={(e) => {
                getGeoLocation(e);
              }}
            >
              use Geolocation
            </MyButton>
          </div>
          <div className={styles.button}></div>
          <MyButton>Send IATA</MyButton>
        </form>
      </div>

      <NearbyContent />
    </div>
  );
}
