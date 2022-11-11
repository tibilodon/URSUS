import mongoose, { Schema } from "mongoose";

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

    //TODO: TEST
    // steps: [{ type: String }],
    steps: [Schema.Types.Mixed],
    // steps: [],

    // steps
    step0: { type: String },
    step1: { type: String },
    step2: { type: String },
    step3: { type: String },
    step4: { type: String },
    step5: { type: String },
    step6: { type: String },
    step7: { type: String },
    step8: { type: String },
    step9: { type: String },
    step10: { type: String },
    step11: { type: String },
    step12: { type: String },

    //ings
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
  // {  },
  { timestamps: true },
  { strict: false }
);

export default mongoose.model("Recipe", RecipeSchema);
