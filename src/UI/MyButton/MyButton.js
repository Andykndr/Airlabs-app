import React from 'react';
import styles from './MyButton.module.scss';

export default function MyButton({ children, ...props }) {
  return (
    <button {...props} className={styles['button']}>
      {children}
    </button>
  );
}
