import React, { useState, useEffect } from "react";
import { getWalls } from "../../services/walls.js";
import WallComp from "../../components/WallComp.jsx";

function Walls() {
  const [walls, setWalls] = useState([]);

  useEffect(() => {
    const fetchWalls = async () => {
      try {
        const allWalls = await getWalls();
        setWalls(allWalls);
      } catch (error) {
        console.error("Error fetching walls:", error);
      }
    };

    fetchWalls();
  }, []);

  return (
    <div>
      <h1>Walls</h1>
      {walls.map((wallData) => (
        <WallComp wall={wallData} />
      ))}
    </div>
  );
}

export default Walls;
