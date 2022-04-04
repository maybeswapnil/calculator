import MainCalculator from './MainCalculator';
import React, {useState, useEffect, useCallback} from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <h1>Calculator</h1>
          <MainCalculator />
      </header>
    </div>
  );
}

export default App;
