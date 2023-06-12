import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import './App.css';
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Nav from "./components/Nav";
import ArticleInfo from "./screens/articles/ArticleInfo";
import ArticleCreate from "./screens/articles/ArticleCreate";
import ArticleEdit from "./screens/articles/ArticleEdit";
import MyArticles from "./screens/articles/MyArticles";
import Profile from "./screens/Profile";
import PubHome from "./screens/PubHome";
import PubArticleInfo from "./screens/articles/PubArticleInfo";
import About from "./screens/About";

function App() {


  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article/:id" element={<ArticleInfo />} />
        <Route path="/article/create" element={< ArticleCreate />} />
        <Route path="/article/:id/edit" element={< ArticleEdit />} />
        <Route path="/articles/me" element={< MyArticles />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pub-home" element={<PubHome />} />
        <Route path="/pub-article/:id" element={<PubArticleInfo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
