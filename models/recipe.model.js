import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur", "UltraProChef"],
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      required: true,
      enum: [
        "Breakfast",
        "main_course",
        "soup",
        "snack",
        "dessert",
        "drink",
        "other",
      ],
    },
    image: {
      type: String,
      required: true,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Recipe", recipeSchema);
