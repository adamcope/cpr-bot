const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const net = new Schema({
  netID: String,
  netName: String,
  floors: [
    {
      floor: Number,
      programs: [
        {
          id: String,
          name: String,
        },
      ],
    },
  ],
  netRunners: [
    {
      id: String,
      name: String,
      floor: Number,
    },
  ],
  daemons: [
    {
      id: String,
      name: String,
      floor: Number,
    },
  ],
});

module.exports = mongoose.model("Netarch", net);

