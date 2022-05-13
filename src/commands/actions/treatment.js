const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("treatment")
    .setDescription("Treat a Critical Injury. (currently non-functional)")
    .addStringOption((option) =>
      option.setName("injury").setDescription("Enter name of Critical Injury.")
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    await pc.save();
    interaction.reply(`[Critical Injury] treated.`);
  },
};
