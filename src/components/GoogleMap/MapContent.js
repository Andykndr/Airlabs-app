import React from 'react';
import styles from './MapContent.module.scss';

export default function MapContent({
  lat,
  lng,
  regNumber,
  status,
  speed,
  dir,
}) {
  return (
    <div className={styles['map-block']}>
      <h2>
        Reg-num : <span></span> {regNumber}
      </h2>
      <p className={styles.infoFlight}>
        Speed: <span>{speed} km</span>
      </p>
      <p className={styles.infoFlight}>
        Direction : <span>{dir} °</span>
      </p>
      <p className={styles.infoFlight}>
        Status : <span>{status}</span>
      </p>
      <p className={styles.infoFlight}>
        Latitude: <span>{lat}</span>
      </p>
      <p className={styles.infoFlight}>
        Longitude: <span>{lng}</span>
      </p>
    </div>
  );
}
