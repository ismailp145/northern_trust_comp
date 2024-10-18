// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-evenly w-full">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/CurrencyConverter" className="hover:text-gray-400">
            Currency Converter
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
