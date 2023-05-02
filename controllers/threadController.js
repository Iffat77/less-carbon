import Thread from "../models/threadModel.js";
import asyncHandler from "express-async-handler";

// Get all threads for a wall
export const getThreadsForWall = asyncHandler(async (req, res) => {
  try {
    const threads = await Thread.find({ wall: req.params.wallId });

    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a thread by ID
export const getThread = asyncHandler(async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) throw new Error("Thread not found");
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new thread
export const createThread = asyncHandler(async (req, res) => {
  try {
    const { title, content, wallId } = req.body;

    const thread = new Thread({
      title,
      content,
      wall: wallId,
      creator: req.user._id,
    });

    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a thread
export const updateThread = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const thread = await Thread.findById(id);
    if (!thread) throw new Error("Thread not found");

    if (thread.creator.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized to update this thread");
    }

    thread.title = title;
    thread.content = content;

    await thread.save();
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a thread
export const deleteThread = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await Thread.findById(id);
    console.log(thread);
    if (!thread) throw new Error("Thread not found");

    if (thread.creator.toString() !== req.user.id) {
      throw new Error(`Not authorized to delete this thread ${req.user.id}`);
    }

    await Thread.findByIdAndRemove(id);
    res.json({ message: "Thread deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
});
