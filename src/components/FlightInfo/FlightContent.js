import React from 'react';
import { useSelector } from 'react-redux';
import toUpCase from '../../utils/toUpCase';
import Spinner from '../../UI/Spinner/Spinner';
import sliceTime from '../../utils/sliceTime';
import sliceDate from '../../utils/sliceDate';
import timeConverter from '../../utils/timeConverter';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { v4 as uuidv4 } from 'uuid';
import styles from './FlightContent.module.scss';

export default function FlightContent() {
  const flightInfo = useSelector((state) => state.flight.flight);
  const flightStatus = useSelector((state) => state.flight.loadingStatus);

  const wrongCode = flightInfo.includes('errorWithWrongCode');

  return (
    <div>
      <div className={styles.flightContent}>
        <h2 className={styles['flight-header']}>
          Information about your flight:
        </h2>

        {flightStatus === 'loading' ? (
          <Spinner />
        ) : wrongCode ? (
          <ErrorMessage>Wrong code!</ErrorMessage>
        ) : (
          flightInfo.map(
            ({
              dep_iata,
              arr_iata,
              duration,
              dep_city,
              dep_name,
              arr_city,
              arr_name,
              dep_terminal,
              arr_terminal,
              dep_gate,
              arr_gate,
              status,
              dep_time,
              arr_time,
            }) => {
              return (
                <div key={uuidv4} className={styles['flight-block']}>
                  <div className={styles.upline}></div>

                  <div className={styles.flightBlocks}>
                    <div className={styles['block']}>
                      <p className={styles['info-label']}>{dep_iata}</p>
                      <div className={styles['info-city']}>
                        {dep_city} <br />
                        <span>{dep_name}</span>
                      </div>
                      <div className={styles['info-time']}>
                        <p>Time/date of departure:</p>
                        <span className={styles.time}>
                          {sliceTime(dep_time)}
                        </span>
                        <br />
                        <span className={styles.date}>
                          {sliceDate(dep_time)}
                        </span>
                      </div>
                      <div className={styles['info-termin']}>
                        Terminal :
                        <span>{dep_terminal ? dep_terminal : '-'}</span> / Gate
                        :<span>{dep_gate ? dep_gate : '-'}</span>
                      </div>
                    </div>
                    <div className={styles['sblock']}>
                      <p className={styles['info-label']}>
                        {timeConverter(duration)}
                      </p>
                      <div className={styles.status}>
                        Status : {toUpCase(status)}
                      </div>
                    </div>
                    <div className={styles['block']}>
                      <p className={styles['info-label']}>{arr_iata}</p>
                      <div className={styles['info-city']}>
                        {arr_city} <br />
                        <span> {arr_name}</span>
                      </div>
                      <div className={styles['info-time']}>
                        <p>Time/date of arrival:</p>
                        <span className={styles.time}>
                          {sliceTime(arr_time)}
                        </span>
                        <br />
                        <span className={styles.date}>
                          {sliceDate(arr_time)}
                        </span>
                      </div>
                      <div className={styles['info-termin']}>
                        Terminal : <span>{!arr_terminal && '-'}</span> / Gate :
                        <span>{!arr_gate && '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.downline}></div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
