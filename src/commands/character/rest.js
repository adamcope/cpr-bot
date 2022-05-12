const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rest")
    .setDescription(
      "Rest to regain Character's BODY stat in HP. (Rest is equivalent to 24hrs of low-activity)"
    ),

  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    if (!pc.isStable) {
      return interaction.reply(
        "You must be stabilized before resting will heal you."
      );
    } else {
      pc.hp[0] = pc.hp[0] + pc.stats.body[0];
      await pc.save();

      interaction.reply("Rested for 24hrs.");
    }
  },
};
