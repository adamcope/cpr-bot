const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, italic, underscore } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("DM Actions")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dmg")
        .setDescription("Apply DMG to a PLayer Character")
        .addStringOption((option) =>
          option
            .setName("username")
            .setDescription("Player's Username.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("dmg")
            .setDescription("Damage to be applied to player's character.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ablate")
            .setDescription("Does damage ablate armor?")
            .addChoice("yes", "Yes")
            .addChoice("no", "No")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("attack")
        .setDescription("Roll an Attack")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Type of Attack")
            .setRequired(true)
            .addChoice("ranged", "Ranged Attack")
            .setRequired(true)
            .addChoice("melee", "Melee Attack")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("stat-value")
            .setDescription("Enter Value of Relevant Stat")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("skill-value")
            .setDescription("Enter Value of Relevant Skill")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("dice")
            .setDescription("DMG roll (ex. '2d6')")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("distance")
            .setDescription("Distance to target (ranged attacks only).")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("skill-check")
        .setDescription("Roll Skill Check")
        .addStringOption((option) =>
          option
            .setName("skill-name")
            .setDescription("Skill Name")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("skill-value")
            .setDescription("Skill Value")
            .setRequired(true)
        )
    ),
  async execute(interaction) {},
};
