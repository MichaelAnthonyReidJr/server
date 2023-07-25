const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const family_memberSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  user_type: {
    type: String,
    enum: ["admin", "adult_user", "child_user"],
    required: true,
  },
  role: {
    type: String,
    enum: ["father", "mother", "daughter", "son", "grandmother", "grandfather"],
    required: true,
  },
  family_id: { type: Schema.Types.ObjectId, ref: "family", required: true },
  image: { type: Buffer, required: true }
});
const FamilyMember = mongoose.model("family_member", family_memberSchema);
module.exports = FamilyMember;
