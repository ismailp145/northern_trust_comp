import React, { useState } from "react";
import "../ismail.css";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
];

const exchangeRates = {
  USD: { EUR: 0.92, GBP: 0.79, JPY: 143.86 },
  EUR: { USD: 1.09, GBP: 0.86, JPY: 156.71 },
  GBP: { USD: 1.27, EUR: 1.16, JPY: 182.24 },
  JPY: { USD: 0.007, EUR: 0.0064, GBP: 0.0055 },
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult("Please enter a valid amount");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (Number(amount) * rate).toFixed(2);
    setResult(`${convertedAmount} ${toCurrency}`);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fromCurrency">From</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="toCurrency">To</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleConvert}>Convert</button>
      </div>
      {result && (
        <div className="result">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
