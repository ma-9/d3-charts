import React, { useState } from 'react';
import './App.css';

// Importing Charts
import BarChart from './components/BarChart';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75, 19, 50, 70]);

  const handleSwipeThambla = () => {
    const myData = data.map((value) => value);
    myData[2] === 45 ? (myData[2] = 60) : (myData[2] = 45);
    myData[3] === 60 ? (myData[3] = 45) : (myData[3] = 60);
    setData(myData);
  };

  const generateNewElement = (e) => {
    e.persist();
    const newElement = Math.random().toFixed(2) * 100;
    setData((prevArray) => {
      return [...prevArray, newElement];
    });
  };

  return (
    <div className='App'>
      <h1>D3 થાંભલા હલાવો અભિયાન</h1>
      <BarChart data={data} />
      <div className='buttons'>
        <button onClick={() => setData(data.map((value) => value + 5))}>
          Update Data
        </button>
        <button onClick={handleSwipeThambla}>Swipe થાંભલા</button>
        <button onClick={generateNewElement}>Add Data</button>
        <button onClick={() => setData(data.filter((value) => value <= 55))}>
          Filter Data
        </button>
      </div>
    </div>
  );
}

export default App;
