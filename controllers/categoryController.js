import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";


export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new Category({
      name,
      description
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    category.name = name;
    category.description = description;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.remove();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
