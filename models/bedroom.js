const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bedroomSchema = new Schema({
  status: { type: String, enum: ["clean", "dirty"] },
  name: { type: String, ref: "user", required: true },
});
const Bedroom = mongoose.model("bedroom", bedroomSchema);
module.exports = Bedroom;
