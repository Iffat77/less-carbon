import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../services/atricles.js';

function ArticleCreate() {

  const [article, setArticle] = useState({
    title: "",
    content: "",
    images: [],
    })

  
  let navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setArticle({
      ...article,
      [name]: value,
    })
   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createArticle(article)
    navigate("/", { replace: true } )
  }
  return (
    <div>ArticleCreate

      <form onSubmit={handleSubmit}>
        <input
          placeholder='Title'
          name='title'
          value={article.title}
          onChange={handleChange}
        />
        <textarea
          placeholder='Content'
          name='content'
          value={article.content}
          onChange={handleChange}
          rows={5}
        />
        <input
        placeholder='Image Links'
        name='image'
        value={article.images}
        onChange={handleChange}
        />

        
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default ArticleCreate