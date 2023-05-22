import Like from "../models/likeModel.js";
import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createLike = asyncHandler(async (req, res) => {
  try {
    const { articleId } = req.params;
    const user = req.user._id;
    console.log(mongoose.Types.ObjectId.isValid(user));

    const article = await Article.findById(articleId);
    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    const existingLike = await Like.findOne({
      article: articleId,
      user: req.user._id,
    });
    if (existingLike) {
      res.status(400);
      throw new Error("Like already exists");
    }
    const like = new Like({
      article: articleId,
      user: user,
    });

    await like.save();
    if (article && article.likes) {
      article.likes.push(like._id);
    }
    await article.save();

    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const getLikesForArticle = asyncHandler(async (req, res) => {
  try {
    const { articleId } = req.params;

    const article = await Article.findById(articleId);
    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    const likes = await Like.find({ article: articleId });

    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const deleteLike = asyncHandler(async (req, res) => {
  try {
    const { likeId } = req.params;
    const user = req.user._id;

    const like = await Like.findById(likeId);

    if (!like) {
      res.status(404);
      throw new Error("Like not found");
    }

    if (like.user.toString() !== user.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this like");
    }

    const article = await Article.findById(like.article);
    if (article && article.likes) {
      article.likes = article.likes.filter(
        (articleLike) => articleLike.toString() !== likeId
      );
      await article.save();
    }

    await Like.findByIdAndRemove(likeId);

    res.json({ message: "Like deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
