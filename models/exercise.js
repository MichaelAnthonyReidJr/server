const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  description: {
    type: String,
    enum: [
      "walking",
      "swimming",
      "cycling",
      "weight lifting",
      "running",
      "yoga",
    ],
  },
  status: { type: String, enum: ["completed", "not completed"] },
  name: { type: String, ref: "user", required: true },
});
const Exercise = mongoose.model("exercise", exerciseSchema);
module.exports = Exercise;
