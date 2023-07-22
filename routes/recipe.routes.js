import express from "express";
import RecipeModel from "../models/recipe.model.js";
import userModel from "../models/user.model.js";

const router = express.Router();
router.post("/create/:id_user", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    console.log(req.body);
    const newRecipe = await RecipeModel.create({
      ...req.body,
      creator: id_user,
    });
    const addRecipe = await userModel.findByIdAndUpdate(id_user, {
      $push: { recipes: newRecipe._id },
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.post("/create-many-recipes", async (req, res) => {
  try {
    console.log(req.body);
    const manyRecipes = await RecipeModel.insertMany(req.body);
    return res.status(201).json(manyRecipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.get("/all", async (req, res) => {
  const allRecipes = await RecipeModel.find({}).sort({ duration: -1 }).select({
    title: 1,
  });
  return res.status(200).json(allRecipes);
});
router.put("/update/:id", async (req, res) => {
  try {
    const id_recipe = req.params.id;

    const data = req.body;

    const config = { new: true, runValidators: true };

    const recipe = await RecipeModel.findByIdAndUpdate(id_recipe, data, config);

    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//soft delete
router.delete("/delete-soft/:id", async (req, res) => {
  try {
    const id_recipe = req.params.id;
    const recipe = await RecipeModel.findByIdAndUpdate(
      id_recipe,
      { active: false },
      { new: true }
    );
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//hard delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const id_recipe = req.params.id;
    const recipe = await RecipeModel.findByIdAndDelete(id_recipe);
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.get("/get/dessert", async (req, res) => {
  try {
    const dessertRecipes = await RecipeModel.find({
      dishType: "dessert",
    }).select({ title: 1, ingredients: 1, duration: 1, _id: 0 });
    return res.status(200).json(dessertRecipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.get("/:id_recipe", async (req, res) => {
  try {
    const id_recipe = req.params.id_recipe;

    const oneRecipe = await RecipeModel.findById(id_recipe).populate("creator");

    return res.status(200).json(oneRecipe);
  } catch (error) {
    console.log(console.error);
    return res.status(500).json(error);
  }
});
export default router;
