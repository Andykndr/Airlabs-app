import img from '../resources/img/main-page/mainImg.avif';
import styles from './style/airlabsMain.module.scss';

function Airlabs() {
  return (
    <div className={styles['main-section']}>
      <h1>AirLabs App - flight information!</h1>
      <div className={styles['main-blocks']}>
        <div className={styles['main-block-img']}>
          <img src={img} alt="plane-image" />
        </div>
        <div className={styles['main-block']}>
          <h2>What is AirLabs?</h2>
          <p>
            AirLabs is a web application that provides users with real-time data
            about flights, airports and aircrafts, including departure and
            arrival times, gate numbers and other
          </p>
        </div>
      </div>
    </div>
  );
}

export default Airlabs;
