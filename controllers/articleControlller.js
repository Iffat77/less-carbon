import Article from "../models/articleModel.js";
import Comment from "../models/commentModel.js";
import asyncHandler from "express-async-handler";

export const getArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const getArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "creator",
        model: "User",
      },
    });

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, content, images } = req.body;

    const article = new Article({
      title,
      content,
      images,
      author: req.user._id,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const updateArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, images } = req.body;

    const article = await Article.findById(id);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    if (article.author.toString() !== userId) {
      res.status(401);
      throw new Error("Not authorized to update this article");
    }

    article.title = title;
    article.content = content;
    article.images = images;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const deleteArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = await Article.findById(id);
    console.log(article)

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    if (article.author.toString() !== userId) {
      res.status(401);
      throw new Error("Not authorized to delete this article");
    }

    await Article.findByIdAndRemove(id);
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const getAllArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await Article.find().populate({
      path: "comments",
      populate: {
        path: "creator",
        model: "User",
      },
    });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
