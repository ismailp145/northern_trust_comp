// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CurrencyConverter from "./components/CurrencyConverter";
import Stats from './components/Stats';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CurrencyConverter" element={<CurrencyConverter />} />
        <Route path="/Stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
