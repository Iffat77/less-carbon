import Thread from '../models/threadModel.js';


// Get all walls
export const getThread = async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};