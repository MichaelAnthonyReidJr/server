const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familySchema = new Schema({
  family_name: { type: String },
  number_of_members: { type: Number },
});
const Family = mongoose.model("family", familySchema);
module.exports = Family;
