import React, { useEffect, useState } from "react";
import axios from "axios";

function RealTimeExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "f612312b781071f2c81a59e2619af1d4"; // Replace with your API key
  const FIXER_API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=GBP,JPY,USD`;

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        console.log("Fetching exchange rates...");
        const response = await axios.get(FIXER_API_URL);
        console.log("API Response:", response.data);

        const data = response.data;
        if (data.success) {
          console.log("Setting exchange rates:", data.rates);
          setExchangeRates(data.rates);
          setError(null);
        } else {
          console.error("Error in API response:", data.error);
          setError(
            "Failed to fetch data from Fixer.io: " + JSON.stringify(data.error)
          );
        }
      } catch (error) {
        console.error("Error during API request:", error);
        setError("An error occurred: " + error.message);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchExchangeRates();

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchExchangeRates, 6000);

    return () => clearInterval(intervalId);
  }, [FIXER_API_URL]);

  console.log("Current exchange rates state:", exchangeRates);

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Real-time Exchange Rates</h1>
      {exchangeRates ? (
        <ul>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <li key={currency}>
              <strong>{currency}:</strong> {rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No exchange rate data available.</p>
      )}
    </div>
  );
}

export default RealTimeExchangeRates;
