import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import mockSearchResults from "./constants/mock.js";
import Ismail from "./constants/ismail.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<mockSearchResults />} />
          <Route path="/Ismail" element={<Ismail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
