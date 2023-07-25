const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readingSchema = new Schema({
  status: { type: String, enum: ["completed", "not completed"] },
  book: { type: String, required: true },
  page_number: { type: Number, required: true },
  name: { type: String, ref: "user", required: true },
});
const Reading = mongoose.model("reading", readingSchema);
module.exports = Reading;
