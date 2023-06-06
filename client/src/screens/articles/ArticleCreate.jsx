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
  
    if (name === "image") {
      const imageLinks = value.split(" ");
      setArticle({
        ...article,
        images: imageLinks,
      });
    } else {
      setArticle({
        ...article,
        [name]: value,
      });
    }
  };
  

  const handleContentChange = (content) => {
    setArticle({
      ...article,
      content: content, 
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle(article);
    navigate("/", { replace: true });
  };
  
  return (
    <div className="h-screen ">
      <form
        className=" flex flex-col gap-10 items-center mt-4 p-4 h-full w-full overflow-auto "
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
          onContentChange={handleContentChange} />
        
        <input
          className="md:w-1/2 lg:min-w-[500px]text-md md:text-lg focus:outline-none p-2 text-black"
          placeholder="Image Links"
          name="image"
          value={article.images}
          onChange={handleChange}
        />

        <button className="text-gray-800 bg-gray-100 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300  font-medium rounded-lg text-sm lg:text-md px-5 py-2.5 mr-2 mb-2" type="submit">Post</button>
      </form>
    </div>
  );
}

export default ArticleCreate;
