import React from 'react';
import src from './error.gif';
import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ children }) {
  return (
    <div className={styles['error-message']}>
      <div className={styles['error-text']}>{children}</div>
      <img src={src} alt="error" />
    </div>
  );
}
