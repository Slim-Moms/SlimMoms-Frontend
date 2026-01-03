import React from 'react';
import styles from './Loader.module.css';

const AppLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
        <div className={styles.dot3}></div>
      </div>
    </div>
  );
};

export default AppLoader;