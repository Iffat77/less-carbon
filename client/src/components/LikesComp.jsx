import React, { useEffect, useState } from "react";
import {
  createLike,
  deleteLike,
  getLikesForArticle,
} from "../services/likes.js";

function LikesComp({ articleId, user }) {
  const [likes, setLikes] = useState([]);
  const [likeId, setLikeId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikesForArticle(articleId);
        setLikes(likesData);
        const likedByUser = likesData.some((like) => like.user === user?._id);
        const userLike = likesData.find((like) => like.user === user?._id);
        setLikeId(userLike?._id || null);
        setIsLiked(likedByUser);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    if (user) {
      fetchLikes();
    }
  }, [articleId, user]);

  const handleLike = async () => {
    if (isLiked) {
      try {
        if (likeId) {
          console.log("LikeID:", likeId);
          await deleteLike(likeId);
          setLikeId(null);
        }
        setIsLiked(false);
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.user !== user._id)
        );
      } catch (error) {
        console.error("Error deleting like:", error);
      }
    } else {
      try {
        const newLike = await createLike(articleId, user?._id);
        setIsLiked(true);
        setLikeId(newLike._id);
        setLikes((prevLikes) => [...prevLikes, newLike]);
      } catch (error) {
        console.error("Error creating like:", error);
      }
    }
  };

  return (
    <div>
      {/* {console.log(likeId)} */}
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <span>{likes.length} Likes</span>
    </div>
  );
}

export default LikesComp;
