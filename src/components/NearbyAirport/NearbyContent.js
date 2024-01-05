import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import styles from './NearbyContent.module.scss';

export default function NearbyContent() {
  const iataData = useSelector((state) => state.iata.iata);
  const status = useSelector((state) => state.iata.loadingStatus);

  const noAirports = iataData.includes('noOneAirport');
  const iataDataByFlat = iataData.flat();

  return (
    <div className={styles.nearbyContent}>
      <h2 className={styles['nearby-header']}>What's nearby?</h2>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <ul className={styles.list}>
          {iataData.length < 1 ? (
            status === 'error' ? (
              <ErrorMessage>Server error ,please try again later!</ErrorMessage>
            ) : (
              <p>Here will be nearby airport...</p>
            )
          ) : noAirports ? (
            <div className={styles.noAirports}>
              Sorry, we didn't find the airport
            </div>
          ) : (
            iataDataByFlat.map(({ name, distance }, i) => {
              return (
                <li className={styles.iataItem} key={name}>
                  <span className={styles.itemNumber}>
                    {i + 1}. {name}
                  </span>
                  <br />
                  {distance && (
                    <span>Distance is - {Math.round(distance)} km</span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
