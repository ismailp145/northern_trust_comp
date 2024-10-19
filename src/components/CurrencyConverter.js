import React, { useState } from "react";
import "../ismail.css";

// need to make an api call to get the value and then get the things,
const currencies = [
  { code: "AEN", name: "United Arab Emirates Dirham" },
  { code: "AFN", name: "Afghan Afghani" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "BBD", name: "Barbadian Dollar" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "BZD", name: "Belize Dollar" },
  { code: "XOF", name: "West African CFA Franc" }, // Used by Benin, Burkina Faso, Côte d'Ivoire, etc.
  { code: "BMD", name: "Bermudian Dollar" },
  { code: "BTN", name: "Bhutanese Ngultrum" },
  { code: "BOB", name: "Bolivian Boliviano" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
  { code: "BWP", name: "Botswana Pula" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "BND", name: "Brunei Dollar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BIF", name: "Burundian Franc" },
  { code: "KHR", name: "Cambodian Riel" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CVE", name: "Cape Verdean Escudo" },
  { code: "XAF", name: "Central African CFA Franc" }, // Used by Chad, Gabon, Congo, etc.
  { code: "CLP", name: "Chilean Peso" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "COP", name: "Colombian Peso" },
  { code: "KMF", name: "Comorian Franc" },
  { code: "CDF", name: "Congolese Franc" },
  { code: "CRC", name: "Costa Rican Colón" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "CUP", name: "Cuban Peso" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "DJF", name: "Djiboutian Franc" },
  { code: "DOP", name: "Dominican Peso" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "SVC", name: "Salvadoran Colón" },
  { code: "ERN", name: "Eritrean Nakfa" },
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "EUR", name: "Euro" }, // Used by 19+ UN member countries
  { code: "FJD", name: "Fijian Dollar" },
  { code: "GMD", name: "Gambian Dalasi" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "GTQ", name: "Guatemalan Quetzal" },
  { code: "GNF", name: "Guinean Franc" },
  { code: "GYD", name: "Guyanese Dollar" },
  { code: "HTG", name: "Haitian Gourde" },
  { code: "HNL", name: "Honduran Lempira" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "INR", name: "Indian Rupee" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "IQD", name: "Iraqi Dinar" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "JMD", name: "Jamaican Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "KZT", name: "Kazakhstani Tenge" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "KGS", name: "Kyrgyzstani Som" },
  { code: "LAK", name: "Lao Kip" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "LSL", name: "Lesotho Loti" },
  { code: "LRD", name: "Liberian Dollar" },
  { code: "LYD", name: "Libyan Dinar" },
  { code: "MOP", name: "Macanese Pataca" },
  { code: "MKD", name: "Macedonian Denar" },
  { code: "MGA", name: "Malagasy Ariary" },
  { code: "MWK", name: "Malawian Kwacha" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "MVR", name: "Maldivian Rufiyaa" },
  { code: "MRU", name: "Mauritanian Ouguiya" },
  { code: "MUR", name: "Mauritian Rupee" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "MNT", name: "Mongolian Tögrög" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "MZN", name: "Mozambican Metical" },
  { code: "MMK", name: "Myanmar Kyat" },
  { code: "NAD", name: "Namibian Dollar" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "ANG", name: "Netherlands Antillean Guilder" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "NIO", name: "Nicaraguan Córdoba" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "KPW", name: "North Korean Won" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "OMR", name: "Omani Rial" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "PAB", name: "Panamanian Balboa" },
  { code: "PGK", name: "Papua New Guinean Kina" },
  { code: "PYG", name: "Paraguayan Guaraní" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Złoty" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "RWF", name: "Rwandan Franc" },
  { code: "SHP", name: "Saint Helena Pound" },
  { code: "WST", name: "Samoan Tālā" },
  { code: "STN", name: "São Tomé and Príncipe Dobra" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "SCR", name: "Seychellois Rupee" },
  { code: "SLL", name: "Sierra Leonean Leone" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SBD", name: "Solomon Islands Dollar" },
  { code: "SOS", name: "Somali Shilling" },
  { code: "ZAR", name: "South African Rand" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SSP", name: "South Sudanese Pound" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "SDG", name: "Sudanese Pound" },
  { code: "SRD", name: "Surinamese Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "SYP", name: "Syrian Pound" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "TJS", name: "Tajikistani Somoni" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "THB", name: "Thai Baht" },
  { code: "TOP", name: "Tongan Paʻanga" },
  { code: "TTD", name: "Trinidad and Tobago Dollar" },
  { code: "TND", name: "Tunisian Dinar" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "TMT", name: "Turkmenistani Manat" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "USD", name: "United States Dollar" },
  { code: "UYU", name: "Uruguayan Peso" },
  { code: "UZS", name: "Uzbekistani Som" },
  { code: "VUV", name: "Vanuatu Vatu" },
  { code: "VES", name: "Venezuelan Bolívar" },
  { code: "VND", name: "Vietnamese Đồng" },
  { code: "XPF", name: "CFP Franc" }, // Used by French Polynesia, New Caledonia, etc.
  { code: "YER", name: "Yemeni Rial" },
  { code: "ZMW", name: "Zambian Kwacha" },
  { code: "ZWL", name: "Zimbabwean Dollar" },
];

const API_KEY = "cc22212db121baed53a39781";
// const _API_URL = "https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/GBP";
// const apiKey = "YOUR-API-KEY"; // Replace with your actual API key

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount) || Number(amount) <= 0)) {
      setResult("Please enter a valid amount");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          console.log("Conversion Rates:", data.conversion_rates);
          const convertedAmount = data.conversion_result;
          setResult(`${convertedAmount} ${toCurrency}`);
        } else {
          console.error("API Error:", data["error-type"]);
        }
      })
      .catch((error) => console.error("Network Error:", error));
  };

  const handleSubmit = () => {
    const exchangeData = {
      amount,
      fromCurrency,
      result,
      toCurrency,
    };
    localStorage.setItem("exchangeData", JSON.stringify(exchangeData));
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
      <div>
        <button onClick={handleSubmit}>Submit Exchange</button>
      </div>
      {result && (
        <div className="result">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
