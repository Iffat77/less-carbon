import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// Get all posts for a thread
export const getPostsForThread = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ thread: req.params.threadId });
    res.json(posts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post by ID
export const getPostById = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  try {
    const { content, thread } = req.body;
    const creator = req.user._id;

    const post = await Post.create({
      content,
      creator,
      thread
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post
export const updatePost = asyncHandler(async (req, res) => {
  try {
    
    const { id } = req.params
    const { content } = req.body
    
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found")
    
    if (post.creator.toString() !== req.user.id) {
      res.status(401)
      throw new Error("Not authorized to update this post")
    }

    post.content = content;
    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post
export const deletePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(req.params.id);
    console.log(post)

    if (!post) throw new Error("Thread not found");

    if (post.creator.toString() !== req.user.id) {
      throw new Error(`Not authorized to delete this thread ${req.user.id}`)
    }

    await Post.findByIdAndRemove(id)
    res.json({ message: "Post deleted" });
    } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

