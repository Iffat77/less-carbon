import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import './App.css';
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Nav from "./components/Nav";
import Walls from "./screens/walls/Walls";
import WallInfo from "./screens/walls/WallInfo";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/walls" element={<Walls />} />
        <Route path="/walls/:id" element={<WallInfo />} />
      </Routes>
    </div>
  );
}

export default App;
