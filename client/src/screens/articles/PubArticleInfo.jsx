import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPubArticle } from "../../services/atricles";
import { getPubUserNameById } from "../../services/findUser";

function PubArticleInfo() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [authorName, setAuthorName] = useState("");


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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getPubArticle(id);
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userName = await getPubUserNameById(article.author);
        setAuthorName(userName);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    if (article) {
      fetchAuthor();
    }
  }, [article]);

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
              <p className="text-xl font-semibold "> - {authorName}</p>
            </div>
          </div>

          {article.images[0] && (
            <div className="items-center rounded-lg shadow sm:flex">
              <img
                className="w-full rounded-lg object-contain"
                src={article.images[0]}
              />
            </div>
          )}
          <div className=" mt-24 p-4 mb-4 overflow-auto text-lg">
            <TextRenderer serializedContent={article.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PubArticleInfo;
