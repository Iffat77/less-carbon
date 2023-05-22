import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticle } from "../../services/atricles.js";
import authService from "../../services/auth.js";
import Likes from "../../components/Likes.jsx";

function ArticeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getUserData();
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticle(id);
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (user && article && user._id === article.author) {
      setShowEdit(true);
    }
  }, [user, article]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Article Info</h1>
      <div>{article.title}</div>
      <p>{article.content}</p>
      <p>{article.author}</p>
      <img src={article.images} alt="images" />

      {/* Temporary testing Likes component */}
      {/* {console.log(user._id)} */}
      {user && <Likes articleId={id} user={user} />}

      {/* Temporary placement of edit link for testing */}
      {showEdit && <Link to={`/article/${id}/edit`}>Edit Article</Link>}
    </div>
  );
}

export default ArticeInfo;
