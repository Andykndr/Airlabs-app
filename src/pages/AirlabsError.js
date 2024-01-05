import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import styles from './style/airlabsError.module.scss';

export default function AirlabsError() {
  return (
    <div className={styles.error}>
      <ErrorMessage>
        Page not found <br />
        Go to <Link to="/">main page</Link>
      </ErrorMessage>
    </div>
  );
}
