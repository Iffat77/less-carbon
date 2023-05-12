import React from 'react'
import { Link } from 'react-router-dom';


function ListAllArticles({ article }) {


  
  return (
    <div>
      <Link to={`/article/${article._id}`}>
        <h3>{article.title}</h3>
        <div>{article.author}</div>
      </Link>

    </div>
  )
}

export default ListAllArticles