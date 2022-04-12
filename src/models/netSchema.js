const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NET = new Schema({
  floors: [{floor: Number, program: [String]}],
  netRunners: [{id: String, name: String, floor: Number }],
  programs: [{id: String, name: String, floor: String}],
  daemons: [{id: String, name: String, floor: String}]
});

module.exports = NET
export {};