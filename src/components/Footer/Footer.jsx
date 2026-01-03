import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img 
            src="/src/img/svg/logo.svg" 
            alt="SlimMoms Logo" 
            className={styles.footerLogoImage}
          />
          <span>SlimMoms</span>
        </div>
        <p>© 2024 SlimMoms - Healthy Living Calculator</p>
        <p className={styles.footerNote}>
          For educational purposes only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;