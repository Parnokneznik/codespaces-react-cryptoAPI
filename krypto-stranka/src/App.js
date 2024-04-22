import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const apiKey = 'ebcd9c38e7507d204593501e2a6588bb613d02d1';

function Home() {
  return (
    <div>
      <h1>Welcome to CryptoAPI Dashboard</h1>
      <p>This is the home page.</p>
    </div>
  );
}

function CryptoList() {
  const [cryptoData, setCryptoData] = useState([]);
  const [cryptoSymbols] = useState(['BTC', 'ETH', 'LTC', 'XRP']);

  useEffect(() => {
    const fetchData = () => {
      const symbolsQuery = cryptoSymbols.join(',');
      axios.get(`https://my.cryptoapis.io/data/v1/asset?asset_id=${symbolsQuery}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      })
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };

    const fetchDataInterval = setInterval(fetchData, 300000);
    fetchData();

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [cryptoSymbols]);

  return (
    <div>
      <h1>Crypto List</h1>
      <ul>
        {cryptoData.map(crypto => (
          <li key={crypto.asset_id}>{crypto.name} - {crypto.symbol}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cryptolist">Crypto List</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cryptolist" element={<CryptoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
