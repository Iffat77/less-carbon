import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import './App.css';
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
