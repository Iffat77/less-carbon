import Thread from ('../models/threadModel.js');
import Wall from ('../models/wallModel.js');

// Get all walls
export const getWalls = async (req, res) => {
  try {
    const walls = await Wall.find();
    res.json(walls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a wall by ID
export const getWall = async (req, res) => {
  try {
    const wall = await Wall.findById(req.params.id);
    if (!wall) throw new Error('Wall not found');
    res.json(wall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new wall
export const createWall = async (req, res) => {
  try {
    const { name, description } = req.body;

    const wall = new Wall({
      name,
      description,
      creator: req.user._id // assuming that req.user contains the authenticated user object
    });

    await wall.save();
    res.json(wall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a wall
export const updateWall = async (req, res) => {
  try {
    const { name, description } = req.body;

    const wall = await Wall.findById(req.params.id);
    if (!wall) throw new Error('Wall not found');

    if (wall.creator.toString() !== req.user._id) {
      throw new Error('Not authorized to update this wall');
    }

    wall.name = name;
    wall.description = description;

    await wall.save();
    res.json(wall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a wall
export const deleteWall = async (req, res) => {
  try {
    const wall = await Wall.findById(req.params.id);
    if (!wall) throw new Error('Wall not found');

    if (wall.creator.toString() !== req.user._id) {
      throw new Error('Not authorized to delete this wall');
    }

    await wall.remove();
    res.json({ message: 'Wall deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a thread to a wall
export const addThreadToWall = async (req, res) => {
  try {
    const { wallId } = req.params;
    const { title, content } = req.body;

    const thread = new Thread({
      title,
      content,
      wall: wallId,
      creator: req.user._id // assuming that req.user contains the authenticated user object
    });

    await thread.save();
    await Wall.findByIdAndUpdate(wallId, { $push: { threads: thread._id } });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
