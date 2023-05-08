import React from 'react'
import { Link } from 'react-router-dom';


function WallComp({ wall }) {


  
  return (
    <div>
      <Link to={`/walls/${wall._id}`}>
        <h3>{wall.name}</h3>
      </Link>

    </div>
  )
}

export default WallComp