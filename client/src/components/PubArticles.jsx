import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPubUserNameById } from "../services/findUser";

const pascalColors = ["#95A5A6"];

function PubArticles({ article }) {
  const [authorName, setAuthorName] = useState("");
  const [avatarColor, setAvatarColor] = useState("");

  useEffect(() => {
    setAvatarColor(pascalColors[0]);
  }, []);

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

  return (
    <div>

      <Link to={`/pub-article/${article._id}`}>
        <div className="flex flex-col items-center border shadow-sm border-gray-50 md:h-48 rounded-t-xl md:rounded-tl-3xl md:flex-row md:max-w-xl hover:bg-gray-100 ">
          {article.images[0] && (
            <img className="object-cover w-full rounded-t-xl h-96 md:h-48 md:w-48 md:rounded-none md:rounded-tl-3xl" src={article.images[0]} />
          )}
          <div className="flex flex-col leading-normal md:items-center md:justify-evenly md:h-full  ">
          <h3 className="pl-4 font-kanit m-2 text-lg md:text-xl tracking-tight text-gray-900 text-clip overflow-hidden">
            {article.title}
          </h3>
          <div className="flex justify-between items-center m-4">
            <div className="flex items-center space-x-4">
              <div
                className="w-7 h-7 rounded-full"
                style={{ backgroundColor: avatarColor }}
              />
              <p className="font-medium ">written by {authorName}</p>
            </div>
          </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PubArticles;
