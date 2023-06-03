import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticle, deleteArticle } from "../../services/atricles.js";
import authService from "../../services/auth.js";
import Likes from "../../components/LikesComp.jsx";
import * as commentService from "../../services/comments.js";
import CreateComment from "../../components/CreateComment.jsx";
import { getUserNameById } from "../../services/findUser.js";

function ArticeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [commentCreator, setCommentCreator] = useState("");

  const TextRenderer = ({ serializedContent }) => {
    const content = JSON.parse(serializedContent);

    return (
      <>
        {content.map((paragraph, index) => (
          // <pre className="w-full" key={index}>{paragraph.children[0].text}</pre>
          <p className="mb-4 text-left" key={index}>
            {paragraph.children[0].text}
          </p>
        ))}
      </>
    );
  };

  const fetchCommentAuthor = async (creatorId) => {
    try {
      const userName = await getUserNameById(creatorId);
      setCommentCreator(userName);
      console.log(commentCreator) 
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };
  

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
    const fetchAuthor = async () => {
      try {
        const userName = await getUserNameById(article.author);
        setAuthorName(userName);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (article) {
      fetchAuthor();
    }
  }, [article]);


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

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const commentsData = await commentService.getCommentsForArticle(id);
  //       setComments(commentsData);

  //       for (const comment of commentsData) {
  //         console.log(comment.creator)
  //         fetchCommentAuthor(comment.creator);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   fetchComments();
  // }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await commentService.getCommentsForArticle(id);
  
        for (let i = 0; i < commentsData.length; i++) {
          const comment = commentsData[i];
          const userName = await getUserNameById(comment.creator);
          commentsData[i] = { ...comment, authorName: userName };
        }
  
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    fetchComments();
  }, [id]);

  const fetchNewComments = async () => {
    try {
      const newComment = await commentService.getCommentsForArticle(id);

      for (let i = 0; i < newComment.length; i++) {
        const comment = newComment[i];
        const userName = await getUserNameById(comment.creator);
        newComment[i] = { ...comment, authorName: userName };
      }

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
    <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white ">
      <div className=" md:flex justify-between px-4 mx-auto max-w-screen-xl ">
        <div className="mx-auto w-full max-w-2xl ">
          <div className="mb-4 lg:mb-6">
            <h2 className="mb-4 text-3xl text-left font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl ">
              {article.title}
            </h2>
            <div className="flex items-center mb-6">
              <p className="text-xl font-semibold ">- {authorName}</p>
            </div>
          </div>
          <hr className="w-8 h-8 mx-auto my-8 bg-gray-200 border-0 rounded mt-24" />
          <div className=" mt-24 p-4 mb-4 overflow-auto text-lg">
            <TextRenderer serializedContent={article.content} />
          </div>
          {/* <img src={article.images} alt="images" /> */}

          {/* Temporary testing Likes component */}
          {/* {console.log(user._id)} */}
          {/* {user && <Likes articleId={id} user={user} />} */}

          <div className="">
          {user && (
              <CreateComment id={id} fetchNewComments={fetchNewComments} />
            )}
   {comments.map((comment) => (
  <div className="p-4 mb-6 bg-gray-100 text-gray-700 rounded-lg flex flex-col gap-4 overflow-hidden" key={comment._id}>
    <div className="flex gap-4 items-center mb-2"> 
      <p>{comment.authorName}</p>
      <p>{comment.createdAt}</p>
    </div>
    <p className="my-4 text-left">{comment.content}</p>
    {comment.creator === user?._id && (
      <button
        className="w-1/4 text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2"
        onClick={() => handleDeleteComment(comment._id)}>
        Delete
      </button>
    )}
  </div>
))}

            
          </div>
        </div>
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-8 lg:mt-16">
          {showEdit && (
            <Link
              to={`/article/${id}/edit`}
              className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2"
            >
              Edit Article
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticeInfo;
