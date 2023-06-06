import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserNameById } from "../services/findUser.js";

const pascalColors = [
  "#95A5A6",
];

function ListAllArticles({ article }) {
  const [authorName, setAuthorName] = useState("");
  const [avatarColor, setAvatarColor] = useState("");
  

  // useEffect(() => {
  //   const randomColor = pascalColors[Math.floor(Math.random() * pascalColors.length)];
  //   setAvatarColor(randomColor);
  // }, []);

  useEffect(() => {
  setAvatarColor(pascalColors[0])
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

  return (
    <div>
      <Link to={`/article/${article._id}`}>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            {article.title}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* <img className="w-7 h-7 rounded-full" src="" alt="userPic" /> */}
              <div
                className="w-7 h-7 rounded-full"
                style={{ backgroundColor: avatarColor }}
              />
              <span className="font-medium ">written by {authorName}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListAllArticles;
