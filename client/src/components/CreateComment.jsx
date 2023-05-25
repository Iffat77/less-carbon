import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCommentForArticle } from "../services/comments";

function CreateComment({ id, fetchNewComments }) {
  const [comment, setComment] = useState({
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, comment);
    await createCommentForArticle(id, comment);
    console.log("submitted");
    if (fetchNewComments) {
      await fetchNewComments();
    }
    setComment({ content: "" });
  };

  return (
    <div>
      CreateComment
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment"
          name="content"
          value={comment.content}
          onChange={handleChange}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default CreateComment;
