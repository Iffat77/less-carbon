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
  return (
    <div>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
              Here's Whats New
              {/* {user.name} */}
            </h2>
            <p className="font-light text-gray-500 sm:text-xl">
              Some articles to connect with
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {articles.map((articleData) => (
              <ListAllArticles article={articleData} />
            ))}
          </div>
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-8 lg:mt-16">
            <Link to="/article/create" className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2 ">Create An Article</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
