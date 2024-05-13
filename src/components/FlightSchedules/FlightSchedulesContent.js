import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFlightCoords } from '../../redux/slices/realTimeFlightSlice';
import sliceTime from '../../utils/sliceTime';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import styles from './FlightSchedulesContent.module.scss';

export default function FlightSchedulesContent() {
  const depData = useSelector((state) => state.schedule.scheduleDep);
  const arrData = useSelector((state) => state.schedule.scheduleArr);
  const loadingStatus = useSelector((state) => state.schedule.loadingStatus);

  const dispatch = useDispatch();
  const router = useNavigate();

  const onRealTimeFlightRequest = (code) => {
    dispatch(fetchFlightCoords(code));
  };

  const depDataByFlat = depData.flat();
  const arrDataByFlat = arrData.flat();

  const errorDepData = depData.includes('errorWithWrongCodeDep');
  const errorArrData = arrData.includes('errorWithWrongCodeArr');

  return (
    <div className={styles['flight-schedules-blocks']}>
      <div className={styles['flight-schedule-block']}>
        <div className={styles.header}>
          <span>Departures </span>
        </div>
        <div className={styles['schdule-info']}>
          <p>Time</p>
          <p>Flight</p>
          <p>Destination</p>
          <p>Status</p>
        </div>
        <ul className={styles['schudule-list']}>
          {loadingStatus === 'loading' ? (
            <Spinner />
          ) : errorDepData ? (
            <ErrorMessage>No information,please try again!</ErrorMessage>
          ) : depDataByFlat.length < 1 ? (
            <div className={styles.defaultMessage}>Here will be schedules</div>
          ) : (
            depDataByFlat.map(
              ({ flight_icao, flight_iata, arr_iata, dep_time, status }) => {
                return (
                  <li
                    key={flight_icao}
                    onClick={() => {
                      router(`/real-time-flight/${flight_iata}`);
                      onRealTimeFlightRequest(flight_iata);
                    }}
                  >
                    <span className={styles['schedule-time']}>
                      {sliceTime(dep_time)}
                    </span>
                    <span className={styles['schedule-flight']}>
                      {flight_iata}
                    </span>
                    <span className={styles['schedule-origin']}>
                      {arr_iata}
                    </span>
                    <span
                      className={
                        status === 'active'
                          ? styles['schedule-status']
                          : styles['schedule-status-done']
                      }
                    >
                      {status}
                    </span>
                  </li>
                );
              }
            )
          )}
        </ul>
      </div>
      <div className={styles['flight-schedule-block']}>
        <div className={styles.header}>
          <span>Arrivals </span>
        </div>
        <div className={styles['schdule-info']}>
          <p>Time</p>
          <p>Flight</p>
          <p>Origin</p>
          <p>Status</p>
        </div>
        <ul className={styles['schudule-list']}>
          {loadingStatus === 'loading' ? (
            <Spinner />
          ) : errorArrData ? (
            <ErrorMessage>No information,please try again!</ErrorMessage>
          ) : depDataByFlat.length < 1 ? (
            <div className={styles.defaultMessage}>Here will be schedules</div>
          ) : (
            arrDataByFlat.map(
              ({ flight_icao, flight_iata, dep_iata, dep_time, status }) => {
                return (
                  <li
                    key={flight_icao}
                    onClick={() => {
                      router(`/real-time-flight/${flight_iata}`);
                      onRealTimeFlightRequest(flight_iata);
                    }}
                  >
                    <span className={styles['schedule-time']}>
                      {sliceTime(dep_time)}
                    </span>
                    <span className={styles['schedule-flight']}>
                      {flight_iata}
                    </span>
                    <span className={styles['schedule-origin']}>
                      {dep_iata}
                    </span>
                    <span
                      className={
                        status === 'active'
                          ? styles['schedule-status']
                          : styles['schedule-status-done']
                      }
                    >
                      {status}
                    </span>
                  </li>
                );
              }
            )
          )}
        </ul>
      </div>
    </div>
  );
}
