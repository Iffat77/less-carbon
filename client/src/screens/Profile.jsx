import React, { useEffect, useState } from "react";
import authService from "../services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { getArticles } from "../services/atricles.js";
import ListAllArticles from "../components/ListAllArticles.jsx";

function Profile() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(null);
  const isAuthenticated = authService.isAuthenticated();

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
        const allArticles = await getArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center px-6 mt-36 md:h-screen lg:py-0">
        <div className="flex flex-col items-center gap-6 p-4 justify-evenly w-full h-full md:h-1/5 rounded-lg shadow border md:mt-0 sm:max-w-md  ">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Please log in to view the content.
          </h2>
          <Link
            className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300  font-medium rounded-lg text-sm lg:text-md px-5 py-2.5"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
            {user.name}'s Articles
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
          "Your Voice, Share, Inspire, and Empower!"
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {articles.map((articleData) => (
            <ListAllArticles article={articleData} />
          ))}
        </div>
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-8 lg:mt-16">
            <Link
              to="/article/create"
              className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2 "
            >
              Create An Article
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Profile;
