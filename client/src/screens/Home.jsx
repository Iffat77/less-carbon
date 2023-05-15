import React, { useEffect, useState } from "react";
import authService from "../services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { getAllArticles } from "../services/atricles.js";
import ListAllArticles from "../components/ListAllArticles.jsx";

const Home = () => {
  const [user, setUser] = useState(null);
  const isAuthenticated = authService.isAuthenticated();
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const fetchUser = async () => {
        try {
          const userData = await authService.getUserData();
          setUser(userData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getAllArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Please log in to view the content.</h2>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  console.log(user);
  return (
    <div className="h-screen w-screen">
      <h2>Welcome, {user.name}!</h2>

      <h1>All Articles</h1>
      {articles.map((articleData) => (
        <ListAllArticles article={articleData} />
      ))}

      <Link to="/article/create">Create An Article</Link>
    </div>
  );
};

export default Home;
