import React from 'react';
import { Circles } from 'react-loader-spinner';
import styles from './Loader.module.css';

const AppLoader = () => {
  return (
    <div className={styles.loader}>
      <Circles
        height="100"
        width="100"
        color="#FC842D"
        ariaLabel="loading"
      />
    </div>
  );
};

export default AppLoader;