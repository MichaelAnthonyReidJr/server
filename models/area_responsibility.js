const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const area_responsibilitySchema = new Schema({
  assigned: {
    type: String,
    enum: [
      "living room",
      "dining room",
      "office",
      "home theater",
      "bathroom-upstairs",
      "family room",
      "kitchen",
      "bathroom-Downstairs",
      "other",
    ],
    required: true,
  },
  status: { type: String, enum: ["clean", "dirty"] },
  name: { type: String, ref: "user", required: true },
});
const AreaResponsibility = mongoose.model(
  "area_responsibility",
  area_responsibilitySchema
);
module.exports = AreaResponsibility;
