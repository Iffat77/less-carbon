import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import './App.css';
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Nav from "./components/Nav";
import ArticleInfo from "./screens/articles/ArticleInfo";
import ArticleCreate from "./screens/articles/ArticleCreate";

function App() {


  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home setCreator/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article/:id" element={<ArticleInfo />} />
        <Route path="/article/create" element={< ArticleCreate />} />
      </Routes>
    </div>
  );
}

export default App;
