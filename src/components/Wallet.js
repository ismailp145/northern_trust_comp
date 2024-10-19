import React, { useState, useEffect } from "react";
import "../colorCSS.css"; // Adjust the path if needed
import { motion } from "framer-motion";
import data from "../data/RawData.json"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";

function Wallet() {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("exchangeData");

  if (storedData) {
    const exchangeData = JSON.parse(storedData);
    console.log(exchangeData.amount); // Access the amount
    console.log(exchangeData.fromCurrency); // Access the fromCurrency
    console.log(exchangeData.result); // Access the result
    console.log(exchangeData.toCurrency); // Access the toCurrency
  } else {
    console.log("No exchange data found in localStorage.");
  }

  // State to store the currencies you own (left-side container)
  const [ownedCurrencies, setOwnedCurrencies] = useState([]);

  // State to store available currencies with prices (right-side container)
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  // Simulate an API call to get owned currencies from the database
  useEffect(() => {
    // Fetch user's owned currencies using the data from JSON
    const userId = "1"; // Replace with dynamic user ID if needed
    const initialOwnedCurrencies = data.currencies[userId].map((currency) => ({
      name: currency.code,
      amount: currency.current_value,
    }));

    setOwnedCurrencies(initialOwnedCurrencies);

    // Set available currencies (you can update this if needed)
    const availableCurrencyData = [
      { name: "USD", price: 1.0 },
      { name: "EUR", price: 1.2 },
      { name: "JPY", price: 0.009 },
      { name: "MXN", price: 19.0 },
      { name: "GBP", price: 1.4 },
      { name: "CAD", price: 0.78 },
    ];
    setAvailableCurrencies(availableCurrencyData);
  }, []);

  // Function to add a currency to owned currencies
  const addCurrency = (currency) => {
    const existingCurrency = ownedCurrencies.find(
      (c) => c.name === currency.name
    );
    if (existingCurrency) {
      const updatedCurrencies = ownedCurrencies.map((c) =>
        c.name === currency.name ? { ...c, amount: c.amount + 1.0 } : c
      );
      setOwnedCurrencies(updatedCurrencies);
    } else {
      setOwnedCurrencies([
        ...ownedCurrencies,
        { name: currency.name, amount: 100 },
      ]);
    }
  };

  // Function to remove a currency from owned currencies
  const removeCurrency = (currencyName) => {
    const updatedCurrencies = ownedCurrencies.filter(
      (c) => c.name !== currencyName
    );
    setOwnedCurrencies(updatedCurrencies);
  };

  const handleConvertClick = (currency) => {
    addCurrency(currency);
    navigate("/CurrencyConverter");
  };

  return (
    <div className="wallet-container flex">
      {/* Left Container - Owned Currencies */}
      <div className="owned-currencies-container flex-1">
        <h1 className="text-2xl mb-4">Personal Wallet</h1>
        <div className="currency-list flex flex-col space-y-4">
          {ownedCurrencies.map((currency, index) => (
            <motion.div
              key={index}
              className="currency-item bg-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {currency.name}
                </h2>
                <p className="amount text-lg mt-2 text-white">
                  Amount: {currency.amount}
                </p>
              </div>
              <button
                onClick={() => removeCurrency(currency.name)}
                className="remove-button text-red-500"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Container - Available Currencies */}
      <div className="available-currencies-container flex-1">
        <h1 className="text-2xl mb-4">Quick Currencies</h1>
        <div className="horizontal-container flex flex-wrap space-x-4">
          {availableCurrencies.map((currency, index) => (
            <motion.div
              key={index}
              className="currency bg-gray-100 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl font-semibold">{currency.name}</h2>
              <p className="price text-lg mt-2">${currency.price.toFixed(2)}</p>
              <button
                onClick={() => handleConvertClick(currency)}
                className="add-button mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Convert
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
