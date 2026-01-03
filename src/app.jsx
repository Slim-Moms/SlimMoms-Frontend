import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: '#FC842D' }}>SlimMoms App is Running! 🎉</h1>
      <p>React is working correctly.</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            background: '#FC842D',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Count: {count}
        </button>
      </div>
      <p style={{ marginTop: '20px' }}>
        If you can see this and the button works, everything is fine!
      </p>
    </div>
  );
}

export default App;