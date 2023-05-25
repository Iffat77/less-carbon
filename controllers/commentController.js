import Article from "../models/articleModel.js";
import Comment from "../models/commentModel.js";
import asyncHandler from "express-async-handler";

export const getCommentsByArticle = asyncHandler(async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId).populate("comments");
    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }
    res.json(article.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const createCommentForArticle = asyncHandler(async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;

    const article = await Article.findById(articleId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    const comment = new Comment({
      content,
      creator: req.user._id,
      article: articleId,
    });

    console.log("here", comment);

    await comment.save();
    article.comments.push(comment._id);
    await article.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const updateCommentForArticle = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    if (comment.creator.toString() !== req.user._id) {
      res.status(401);
      throw new Error("Not authorized to update this comment");
    }

    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const deleteCommentForArticle = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;

    // const populatedComment = await Comment.findById(commentId).populate('creator')
    // console.log(populatedComment.creator)

    const comment = await Comment.findById(commentId).populate("creator");

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }
    // console.log(typeof comment.creator._id, typeof req.user._id)

    if (comment.creator._id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this comment");
    }

    await Comment.findByIdAndRemove(commentId);

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
