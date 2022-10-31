import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Kérlek add meg a recept nevét"] },
    //jobType
    recipeType: {
      type: String,
      enum: ["desszert", "főétel", "leves", "egyéb"],
      default: "egyéb",
    },

    //status
    difficulty: {
      type: String,
      enum: ["könnyű", "közepes", "nehéz"],
      default: "könnyű",
    },

    steps: {
      step_1: { type: String },
      step_2: { type: String },
      step_3: { type: String },
    },
    ing_1: {
      quantity: Number,
      ingredient: String,
      value: {
        type: String,
        enum: ["L", "g", "kg"],
        // default: "kérlek válassz",
      },
    },
    ing_2: {
      quantity: Number,
      ingredient: String,
      value: {
        type: String,
        enum: ["L", "g", "kg"],
        // default: "kérlek válassz",
      },
    },
    ing_3: {
      quantity: Number,
      ingredient: String,
      value: {
        type: String,
        enum: ["L", "g", "kg"],
        // default: "kérlek válassz",
      },
    },

    timeMinutesValue: { type: Number },
    timeHoursValue: { type: Number },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);
