import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchScheduleArr,
  fetchScheduleDep,
} from '../../redux/slices/scheduleSlice';
import MyInput from '../../UI/MyInput/MyInput';
import Underline from '../../UI/uderline/Underline';
import MyButton from '../../UI/MyButton/MyButton';
import FlightSchedulesContent from './FlightSchedulesContent';
import styles from './FlightSchedules.module.scss';

export default function FlightSchedules() {
  const [scheduleCode, setScheduleCode] = useState('');
  const dispatch = useDispatch();

  const onSubmitSchedules = (e, code) => {
    e.preventDefault();
    if (code) {
      dispatch(fetchScheduleDep(code));
      dispatch(fetchScheduleArr(code));
      setScheduleCode('');
    }
  };

  return (
    <div className={styles['flight-info-block']}>
      <div className={styles['flight-info-header']}>Flight Schedules</div>
      <Underline />
      <div className={styles['flight-info-form']}>
        <form onSubmit={(e) => onSubmitSchedules(e, scheduleCode)}>
          <div className={styles['flight-info-search-block']}>
            <MyInput
              type="text"
              value={scheduleCode}
              onChange={(e) => {
                setScheduleCode(e.target.value);
              }}
              id="flightSchedules"
              label="Airport code : "
              placeholder="WAW"
            />
          </div>
          <div className={styles.button}></div>
          <MyButton>Search</MyButton>
        </form>
      </div>
      <FlightSchedulesContent />
    </div>
  );
}
