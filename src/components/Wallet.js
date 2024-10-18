import React, { useState, useEffect } from 'react';
import '../colorCSS.css'; // Adjust the path if needed
import { motion } from 'framer-motion';

function Wallet() {
    // State to store the currencies you own (left-side container)
    const [ownedCurrencies, setOwnedCurrencies] = useState([]);

    // State to store available currencies with prices (right-side container)
    const [availableCurrencies, setAvailableCurrencies] = useState([]);

    // Hardcoded data for available currencies (can later be fetched from API)
    const availableCurrencyData = [
        { name: 'USD', price: 1.00 },
        { name: 'EUR', price: 1.20 },
        { name: 'JPY', price: 0.009 },
        { name: 'MXN', price: 19.00 },
        { name: 'GBP', price: 1.40 },
        { name: 'CAD', price: 0.78 },
        // { name: 'SNG', price: 1.30 },
        // { name: 'EGP', price: 0.18 }
    ];

    // Simulate an API call to get owned currencies from the database
    useEffect(() => {
        // Simulate fetching owned currencies from an API or database
        const initialOwnedCurrencies = [
            { name: 'USD', amount: 1000 },
            { name: 'EUR', amount: 850 }
        ];

        setOwnedCurrencies(initialOwnedCurrencies);
        setAvailableCurrencies(availableCurrencyData);
    }, []);

    // Function to add a currency to owned currencies
    const addCurrency = (currency) => {
        // Check if the currency is already owned
        const existingCurrency = ownedCurrencies.find(c => c.name === currency.name);
        if (existingCurrency) {
            // Update the amount for the owned currency
            const updatedCurrencies = ownedCurrencies.map(c =>
                c.name === currency.name ? { ...c, amount: c.amount + 100 } : c
            );
            setOwnedCurrencies(updatedCurrencies);
        } else {
            // Add the new currency to the owned currencies
            setOwnedCurrencies([...ownedCurrencies, { name: currency.name, amount: 100 }]);
        }
    };

    // Function to remove a currency from owned currencies
    const removeCurrency = (currencyName) => {
        const updatedCurrencies = ownedCurrencies.filter(c => c.name !== currencyName);
        setOwnedCurrencies(updatedCurrencies);
    };

    return (
        <div className="wallet-container flex">
            {/* Left Container - Owned Currencies */}
            <div className="owned-currencies-container flex-1">
                <h1 className="text-2xl mb-4">Perosnal Wallet</h1>
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
                                onClick={() => addCurrency(currency)}
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