import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlight } from '../../redux/slices/flightSlice';
import Underline from '../../UI/uderline/Underline';
import MyButton from '../../UI/MyButton/MyButton';
import MyInput from '../../UI/MyInput/MyInput';
import FlightContent from './FlightContent';
import styles from './FlightInfo.module.scss';

export default function FlightInfo() {
  const [flightIata, setFlightIata] = useState('');
  const dispatch = useDispatch();

  const onSubmitViaFlight = (e, code) => {
    e.preventDefault();
    if (code) {
      dispatch(fetchFlight(code));
      setFlightIata('');
    }
  };

  return (
    <div className={styles['flight-info-block']}>
      <div className={styles['flight-info-header']}>Flight Info </div>
      <Underline />
      <div className={styles['flight-info-form']}>
        <form onSubmit={(e) => onSubmitViaFlight(e, flightIata)}>
          <div className={styles['flight-info-search-block']}>
            <MyInput
              type="text"
              value={flightIata}
              onChange={(e) => setFlightIata(e.target.value)}
              id="info"
              label="Flight code (IATA) : "
              placeholder="AA7823"
            />
          </div>
          <div className={styles.button}></div>
          <MyButton>Search</MyButton>
        </form>
      </div>
      <FlightContent />
    </div>
  );
}
