import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticle, deleteArticle } from "../../services/atricles.js";
import authService from "../../services/auth.js";
import Likes from "../../components/LikesComp.jsx";
import * as commentService from "../../services/comments";
import CreateComment from "../../components/CreateComment.jsx";
// import CommentComp from "../../components/CommentComp.jsx";

function ArticeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
    const fetchComments = async () => {
      try {
        const commentsData = await commentService.getCommentsForArticle(id);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const fetchNewComments = async () => {
    try {
      const newComment = await commentService.getCommentsForArticle(
        id
      );
      setComments(newComment);
    } catch (error) {
      console.error("Error fetching updated comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };


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
      {/* <p>{article._id}</p> */}
      <div>{article.title}</div>
      <p>{article.content}</p>
      <p>{article.author}</p>
      <img src={article.images} alt="images" />

      {/* Temporary testing Likes component */}
      {/* {console.log(user._id)} */}
      {user && <Likes articleId={id} user={user} />}

      <div className="border-2 border-black">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            {comment.creator === user?._id && (
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))}

        {user && <CreateComment id={id} fetchNewComments={fetchNewComments} />}
      </div>

      {/* Temporary placement of edit link for testing */}
      {showEdit && <Link to={`/article/${id}/edit`}>Edit Article</Link>}
    </div>
  );
}

export default ArticeInfo;
