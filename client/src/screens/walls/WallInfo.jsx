import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWall } from '../../services/walls.js';


function WallInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [wall, setWall] = useState(null)

  useEffect(() => {
    const fetchWall = async () => {
      try {
        const wallData = await getWall(id)
        setWall(wallData)
      } catch (error) {
        console.error('Error fetching wall:', error)
      }
    };

    fetchWall()
  }, [id])

  if (!wall) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Wall Info</h1>
      <div>{wall.name}</div>
      <p>{wall.description}</p>
      <p>{wall.creator}</p>
    </div>
  );
}


export default WallInfo