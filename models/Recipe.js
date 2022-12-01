import mongoose, { Schema } from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Kérlek add meg a recept nevét"] },
    //recipeType
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

    //ingredients --add enum later--
    ingredients: [Schema.Types.Mixed],

    //steps
    steps: [Schema.Types.Mixed],

    timeMinutesValue: { type: Number },
    timeHoursValue: { type: Number },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    recipeImage: {
      type: String,
    },
  },
  // {  },
  { timestamps: true },
  { strict: false }
);

export default mongoose.model("Recipe", RecipeSchema);
