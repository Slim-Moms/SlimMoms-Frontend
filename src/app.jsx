import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenCalculator = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/calculator';
    }, 1000);
  };

  return (
    <Router>
      <div className="App">
        {/* Loader */}
        {isLoading && <Loader />}
        
        {/* Navigation */}
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/calculator" className="nav-link" onClick={handleOpenCalculator}>
            Calorie Calculator
          </Link>
          <button 
            className="nav-link modal-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </button>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/" element={
              <div className="home-container">
                <h1 className="home-title">SlimMoms</h1>
                <p className="home-subtitle">
                  Your companion on the journey to healthy living
                </p>
                <button 
                  className="cta-button"
                  onClick={handleOpenCalculator}
                >
                  Use Calorie Calculator
                </button>
                
                <div className="features">
                  <div className="feature-card">
                    <h3>Track Calories</h3>
                    <p>Monitor your daily calorie intake</p>
                  </div>
                  <div className="feature-card">
                    <h3>Set Goals</h3>
                    <p>Achieve your weight goals</p>
                  </div>
                  <div className="feature-card">
                    <h3>Healthy Recipes</h3>
                    <p>Discover nutritious meals</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        {/* Demo Modal */}
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2>Welcome to SlimMoms!</h2>
            <p>This is a demo modal showing our modal component in action.</p>
            <p>Features:</p>
            <ul>
              <li>Press ESC to close</li>
              <li>Click outside to close</li>
              <li>Responsive design</li>
              <li>Accessible</li>
            </ul>
            <button 
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              Close Modal
            </button>
          </div>
        </Modal>

        <footer className="footer">
          <p>SlimMoms &copy; {new Date().getFullYear()} - Healthy Living App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;