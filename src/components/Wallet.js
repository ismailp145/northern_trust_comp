import React, { useState, useEffect } from 'react';
import '../colorCSS.css'; // Adjust the path if needed
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import data from '../data/RawData.json'; // Adjust the path if needed
import CurrencyConverter from '../components/CurrencyConverter'; // Adjust the path if needed

function Wallet() {
    const [ownedCurrencies, setOwnedCurrencies] = useState([]);
    const [availableCurrencies, setAvailableCurrencies] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

    useEffect(() => {
        const userId = "1"; // Replace with dynamic user ID if needed
        const initialOwnedCurrencies = data.currencies[userId].map(currency => ({
            name: currency.code,
            amount: currency.current_value
        }));

        setOwnedCurrencies(initialOwnedCurrencies);

        const availableCurrencyData = [
            { name: 'USD', price: 1.00 },
            { name: 'EUR', price: 1.20 },
            { name: 'JPY', price: 0.009 },
            { name: 'MXN', price: 19.00 },
            { name: 'GBP', price: 1.40 },
            { name: 'CAD', price: 0.78 }
        ];
        setAvailableCurrencies(availableCurrencyData);
    }, []);

    const removeCurrency = (currencyName) => {
        const updatedCurrencies = ownedCurrencies.filter(c => c.name !== currencyName);
        setOwnedCurrencies(updatedCurrencies);
    };

    // Function to handle navigation to the CurrencyConverter
    const handleBuy = (currency) => {
        navigate('/CurrencyConverter', { state: { currency } }); // Navigate to the CurrencyConverter and pass the selected currency as state
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
                                <h2 className="text-lg font-semibold text-white">{currency.name}</h2>
                                <p className="amount text-lg mt-2 text-white">Amount: {currency.amount}</p>
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
                                onClick={() => handleBuy(currency)}
                                className="add-button mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Buy
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wallet;
