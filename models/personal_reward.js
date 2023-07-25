const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personal_rewardSchema = new Schema({
  for_helping: { type: String, required: true },
  do_what: { type: String, required: true },
  bucks: { type: String, enum: ["mommy", "daddy", "other"], required: true },
  amount: { type: Number, required: true },
  date_of_reward: { type: Date, required: true },
  total_bucks: { type: Number, required: true },
  name: { type: String, ref: "user", required: true },
});
const PersonalReward = mongoose.model("personal_reward", personal_rewardSchema);
module.exports = PersonalReward;
