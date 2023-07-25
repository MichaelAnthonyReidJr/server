const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    enum: [
      "washing dishes",
      "washing/drying Clothes",
      "drying dishes",
      "cooking",
      "mowing grass",
      "folding clothes",
      "other",
    ],
  },
  status: { type: String, enum: ["completed", "not completed"] },
  assigned_to: { type: String, ref: "user", required: true },
});
const Task = mongoose.model("task", taskSchema);
module.exports = Task;
