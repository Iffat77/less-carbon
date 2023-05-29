import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateArticle, getArticle, deleteArticle } from "../../services/atricles";

function ArticleEdit() {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    images: "",
  });

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      let articleToEdit = await getArticle(id);
      setArticle(articleToEdit);
    };

    fetchArticles();
  }, [id]);


  const handleDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(articleId);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArticle(id, article);
    navigate(`/article/${id}`, { replace: true });
  };

  return (
    <div>
      <h2>Edit Article</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
        <textarea
          placeholder="Content"
          name="content"
          value={article.content}
          onChange={handleChange}
          rows={5}
        />
        <input
          placeholder="Image Links"
          name="image"
          value={article.images}
          onChange={handleChange}
        />

        <button type="submit">Update Article</button>
      </form>

      <button onClick={() => handleDeleteArticle(article._id)}>
        Delete Article
      </button>
    </div>
  );
}

export default ArticleEdit;
