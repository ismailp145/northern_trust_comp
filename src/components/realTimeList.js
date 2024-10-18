import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../realTimeListCSS.css'; // Import the CSS file for styling

function RealTimeList() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'f612312b781071f2c81a59e2619af1d4'; // Replace with your API key
  const FIXER_API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=GBP,JPY,USD`;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(FIXER_API_URL);
        const data = response.data;

        if (data.success) {
          setExchangeRates(data.rates);
          setError(null);
        } else {
          setError('Failed to fetch data from Fixer.io: ' + JSON.stringify(data.error));
        }
      } catch (error) {
        setError('An error occurred: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, 60000);
    return () => clearInterval(intervalId);
  }, [FIXER_API_URL]);

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="real-time-list-container">
      <h1>Real-time Exchange Rates</h1>
      <ul className="real-time-list">
        {exchangeRates ? (
          Object.entries(exchangeRates).map(([currency, rate]) => (
            <li key={currency} className="real-time-list-item">
              <div className="currency-info">
                <span className="currency-code">{currency}</span>
                <span className="currency-rate">{rate.toFixed(4)}</span>
              </div>
              <button
                className="details-button"
                onClick={() => {
                  alert(`Navigate to details page for ${currency}`);
                }}
              >
                View Details
              </button>
            </li>
          ))
        ) : (
          <p>No exchange rate data available.</p>
        )}
      </ul>
    </div>
  );
}

export default RealTimeList;
