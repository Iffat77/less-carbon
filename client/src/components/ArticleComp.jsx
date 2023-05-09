import React from 'react'
import { Link } from 'react-router-dom';


function ArticleComp({ article }) {


  
  return (
    <div>
      <Link to={`/article/${article._id}`}>
        <h3>{article.title}</h3>
      </Link>

    </div>
  )
}

export default ArticleComp