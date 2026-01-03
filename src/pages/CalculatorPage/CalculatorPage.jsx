import React, { useState } from 'react';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = calculateDailyCalories(values);
      setCalculationResult(result);
      setIsLoading(false);
      setIsModalOpen(true);
    }, 1500);
  };

  const calculateDailyCalories = (data) => {
    // Harris-Benedict Formula
    let bmr;
    if (data.bloodType === '1' || data.bloodType === '3') {
      // For blood types 1 and 3 (simplified calculation)
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      // For blood types 2 and 4
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }
    
    const dailyCalories = Math.round(bmr * 1.2); // Sedentary activity level
    const weightDifference = data.weight - data.desiredWeight;
    
    return {
      dailyCalories,
      weightDifference,
      bmr: Math.round(bmr),
      data: { ...data },
    };
  };

  return (
    <div className={styles.page}>
      {isLoading ? (
        <Loader />
      ) : (
        <CalculatorCalorieForm 
          onSubmit={handleSubmit}
          initialValues={{
            height: '',
            age: '',
            weight: '',
            desiredWeight: '',
            bloodType: '1',
          }}
        />
      )}
      
      {isModalOpen && calculationResult && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Your Daily Calorie Intake</h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {calculationResult.dailyCalories}
                <span className={styles.resultUnit}>kcal</span>
              </div>
              <p className={styles.resultDescription}>
                This is your recommended daily calorie intake to reach your desired weight.
              </p>
            </div>
            
            <div className={styles.details}>
              <h3 className={styles.detailsTitle}>Calculation Details</h3>
              <ul className={styles.detailsList}>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Height:</span>
                  <span className={styles.detailValue}>{calculationResult.data.height} cm</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Age:</span>
                  <span className={styles.detailValue}>{calculationResult.data.age} years</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Current Weight:</span>
                  <span className={styles.detailValue}>{calculationResult.data.weight} kg</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Desired Weight:</span>
                  <span className={styles.detailValue}>{calculationResult.data.desiredWeight} kg</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>Blood Type:</span>
                  <span className={styles.detailValue}>{calculationResult.data.bloodType}</span>
                </li>
                <li className={styles.detailItem}>
                  <span className={styles.detailLabel}>BMR (Basal Metabolic Rate):</span>
                  <span className={styles.detailValue}>{calculationResult.bmr} kcal</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.actionButton}
                onClick={() => window.print()}
              >
                Print Results
              </button>
              <button 
                className={styles.actionButtonSecondary}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;