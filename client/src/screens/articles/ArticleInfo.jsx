import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getArticle } from '../../services/atricles.js';


function ArticeInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null);


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticle(id)
        setArticle(articleData)
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    };

    fetchArticle()
  }, [id])

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Article Info</h1>
      <div>{article.title}</div>
      <p>{article.content}</p>
      <p>{article.author}</p>
      {console.log(article)}
      <img src={article.images}></img>

      
  {/* temporary placement of edit link for testing */}
  <Link to={`/article/${id}/edit`}>Edit Article</Link>

      
    </div>
  );
}


export default ArticeInfo