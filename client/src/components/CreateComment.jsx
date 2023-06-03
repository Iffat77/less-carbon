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
      <form onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white border border-gray-200 rounded-lg rounded-t-lg">
          <textarea
            type="text"
            rows="5"
            placeholder="Leave a comment"
            name="content"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:outline-none"
            value={comment.content}
            onChange={handleChange}
          />
        </div>
          <button className="mb-8 text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 " type="submit">Add Comment</button>
      </form>

    </div>
  );
}

export default CreateComment;
