const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("critical-injury")
    .setDescription("Apply DMG to your character.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("body")
        .setDescription("Roll to add a Body Critical Injury to your character.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("head")
        .setDescription("Roll to add a Head Critical Injury to your character.")
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    //!! add function to roll on critical injurt table.

    await pc.save();

    interaction.reply("Injury applied.");
  },
};
