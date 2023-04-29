import Wall from '../models/wallModel.js';
import Thread from '../models/threadModel.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Get all walls
export const getWalls = asyncHandler( async (req, res) => {
  try {
    const walls = await Wall.find({ creator: req.user.id });


    res.json(walls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a wall by ID
export const getWall = asyncHandler(  async (req, res) => {
  try {
    const wall = await Wall.findById(req.params.id);
    if (!wall) throw new Error('Wall not found');
    res.json(wall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new wall
export const createWall =asyncHandler(  async (req, res) => {
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
});

// Update a wall
export const updateWall = asyncHandler( async (req, res) => {
  try {
    const { id } = req.params
    const  user  = req.user.id
    const { name, description } = req.body;

    const wall = await Wall.findById(req.params.id);
    if (!wall) throw new Error('Wall not found');

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (wall.creator.toString() !== user) {
      res.status(401)
      throw new Error('Not authorized to update this wall');
    }

    wall.name = name;
    wall.description = description;

    await wall.save();
    res.json(wall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a wall
export const deleteWall = asyncHandler( async (req, res) => {
  try {
    const { id } = req.params
    const  user  = req.user.id
    const wall = await Wall.findById(id);
    if (!wall) throw new Error('Wall not found');
    
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (wall.creator.toString() !== user) {
      throw new Error(`Not authorized to delete this wall ${user}`);
    }
    // console.log(`\n\nparamsID: ${id}\n\n user: ${user}\n\n wall: ${wall}\n\n wallCreator: ${wall.creator}`)

    await wall.deleteOne();
    res.json({ message: 'Wall deleted' });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Add a thread to a wall
export const addThreadToWall = asyncHandler( async (req, res) => {
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
});


// Logged in user wall

// export const getProfileWalls = asyncHandler( async (req, res) => {
//   try {
//     const walls = await Wall.find();

    
//     res.json(walls);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // Delete a wall
// export const deleteWall = asyncHandler(async (req, res) => {
//   try {
//     const wall  = await Wall.findById(req.params.id);

//     const user = await User.findById(req.user._id);
//     if (!wall) throw new Error("Wall not found");

//     if (!req.user._id) {
//       res.status(401);
//       throw new Error("User not found");
//     }

//     if (wall.creator.toString() !== user._id.toString()) {
//       throw new Error(
//         `Not authorized to delete this wall, wall-creator:${typeof wall.creator} user:${typeof user._id} wall:${{wall}}`
//       );
//     }

//     await wall.remove();
//     res.json({ message: "Wall deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });