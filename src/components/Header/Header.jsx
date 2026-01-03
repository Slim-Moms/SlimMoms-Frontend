import React from 'react';
import styles from './Header.module.css';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContainer}>
        {/* Logo Bölümü */}
        <div className={styles.logoSection}>
          <img 
            src="/src/img/svg/logo.svg" 
            alt="SlimMoms Logo" 
            className={styles.logoImage}
          />
          <div className={styles.appTitle}>
            <span className={styles.main}>SlimMoms</span>
            <span className={styles.sub}>Healthy Living Calculator</span>
          </div>
        </div>

        {/* Navigasyon Bölümü */}
        <nav className={styles.appNav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'calculator' ? styles.active : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <span className={styles.navText}>Calculator</span>
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'diary' ? styles.active : ''}`}
            onClick={() => setActiveTab('diary')}
          >
            <span className={styles.navText}>Diary</span>
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'about' ? styles.active : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className={styles.navText}>About</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;