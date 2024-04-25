import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BiomTable from "./Pages/BiomTable";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<BiomTable />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
