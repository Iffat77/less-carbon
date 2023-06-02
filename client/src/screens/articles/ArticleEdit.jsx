import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateArticle,
  getArticle,
  deleteArticle,
} from "../../services/atricles";
import TextEditor from "../../components/TextEditor";

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

  const handleContentChange = (content) => {
    setArticle({
      ...article,
      content: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArticle(id, article);
    navigate(`/article/${id}`, { replace: true });
  };

  return (
    <div className="h-screen">
      <form
        className=" flex flex-col gap-10 items-center mt-4 py-4 h-full w-full overflow-auto "
        onSubmit={handleSubmit}
      >
        <input
          className="md:w-1/2 lg:min-w-[500px]text-lg md:text-2xl focus:outline-none"
          placeholder="Title"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
        <TextEditor
          placeholder="Content"
          onContentChange={handleContentChange}
        />

        <button
          className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300  font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2"
          type="submit"
        >
          Post
        </button>
      <button
        className= "text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300  font-medium rounded-lg text-sm lg:text-md px-5 py-2.5"
        onClick={() => handleDeleteArticle(article._id)}
      >
        Delete Article
      </button>
      </form>
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 mt-8 lg:mt-16"> 
      </div>

    </div>
  );
}

export default ArticleEdit;
