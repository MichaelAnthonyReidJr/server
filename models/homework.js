const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  assigned: { type: String },
  status: { type: String, enum: ["completed", "not completed"] },
  name: { type: String, ref: "user" },
});
const Homework = mongoose.model("homework", homeworkSchema);
module.exports = Homework;
