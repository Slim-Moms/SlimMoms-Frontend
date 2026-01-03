import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  // Sayfa geçişlerini kontrol eden state
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <Provider store={store}>
      <div className="App">
        {/* Header Bileşeni - Navigasyon kontrolünü prop olarak geçiyoruz */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="app-main">
          {/* Sadece Calculator Tab'ı aktifse senin sayfanı gösteriyoruz */}
          {activeTab === 'calculator' && <CalculatorPage />}
          
          {/* Diğer tablar için basit placeholderlar */}
          {activeTab === 'diary' && (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px', color: '#666' }}>
              🚧 Diary Page (Diğer arkadaşın görevi)
            </div>
          )}
          
          {activeTab === 'about' && (
             <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px', color: '#666' }}>
              ℹ️ About Page (Diğer arkadaşın görevi)
            </div>
          )}
        </main>

        <Footer />
        
        {/* Modal Root index.html içinde olduğu için buraya eklemeye gerek yok */}
      </div>
    </Provider>
  );
}

export default App;