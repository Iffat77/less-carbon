import React, { useEffect, useState } from "react";
import { getPubArticles } from "../services/atricles";
import { Link, useNavigate } from "react-router-dom";
import PubArticles from "../components/PubArticles";

function PubHome() {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getPubArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
            Here's Whats New
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            Join the conversation by creating your account today!
            </p>
            
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {articles.map((articleData) => (
            <PubArticles article={articleData} />
          ))}
        </div>
       
      </div>
    </section>
  </div>
  )
}

export default PubHome