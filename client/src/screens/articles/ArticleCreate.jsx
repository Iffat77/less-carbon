import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../services/atricles.js";
import TextEditor from "../../components/TextEditor.jsx";

function ArticleCreate() {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    images: [],
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleContentChange = (content) => {
    setArticle({
      ...article,
      content: content, // Update the content state
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(article);
    navigate("/", { replace: true });
  };
  
  return (
    <div className="h-screen ">
      ArticleCreate
      <form
        className=" flex flex-col gap-10 items-center h-2/3  w-full border-2 border-red-600 "
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Title"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
        <TextEditor onContentChange={handleContentChange} />
        <input
          placeholder="Image Links"
          name="image"
          value={article.images}
          onChange={handleChange}
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default ArticleCreate;
