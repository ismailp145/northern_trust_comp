import React, { useState, useEffect } from 'react';
import '../colorCSS.css'; // Adjust the path if needed
import { motion } from 'framer-motion';

function Wallet() {
    // State to store currency data
    const [currencies, setCurrencies] = useState([]);

    // Example forex data; you can replace this with actual API data
    const currencyData = [
        { name: 'USD', price: 1.00, amount: 1000, change: 0.00 },
        { name: 'EUR', price: 1.20, amount: 850, change: 0.05, isPositive: true },
        { name: 'JPY', price: 0.009, amount: 100000, change: -0.01 },
        { name: 'MXN', price: 19.00, amount: 1000, change: -0.02 },
        { name: 'GBP', price: 1.40, amount: 600, change: 0.03, isPositive: true },
        { name: 'CAD', price: 0.78, amount: 400, change: -0.04 },
    ];

    useEffect(() => {
        // You can fetch real-time forex data here or update the data manually
        setCurrencies(currencyData);
    }, []);

    return (
        <div className="currency-container">
            <h1 className="text-2xl mb-4">Wallet</h1> {/* Header for the currency container */}
            <div className="horizontal-container flex space-x-4">
                {currencies.map((currency, index) => (
                    <motion.div
                        key={index}
                        className="currency bg-gray-100 p-4 rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h2 className="text-xl font-semibold">{currency.name}</h2>
                        <p className="price text-lg mt-2">${currency.price.toFixed(2)}</p>
                        <p className={`change mt-1 ${currency.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {currency.change.toFixed(2)}%
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Wallet;
