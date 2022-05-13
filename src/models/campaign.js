const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaign = new Schema({
  campaignID: String,
  campaignName: String,
  gmUserID: Number,
  gmUserName: String,
  playerCharacters: [{ userID: Number, username: String, character: String }],
  npcs: [{ npcID: String, npcName: String }],
  netArchitectures: [{ archID: String, archName: String }],
});

module.exports = mongoose.model("Campaign", campaign);
