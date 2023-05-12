import React, { useState, useEffect } from "react";
import { getArticles } from "../../services/atricles.js";
import ListAllArticles from "../../components/ListAllArticles.jsx";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>My Articles</h1>
      {articles.map((articleData) => (
        <ListAllArticles article={articleData} />
      ))}
    </div>
  );
}

export default Articles;
