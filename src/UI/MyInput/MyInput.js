import React from 'react';
import styles from './MyInput.module.scss';

export default function MyInput(props) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={props.id}>{props.label}</label>
      <input className={styles.myInput} {...props} />
    </div>
  );
}
