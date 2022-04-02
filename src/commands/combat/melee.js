const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, italic, underscore } = require("@discordjs/builders");
const thumbGIFurl = require("../../mechanics/thumbGIFurl.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("melee")
    .setDescription("Make a Melee Attack")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("weapon")
        .setDescription("Melee Weapon Attack")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of the weapon.")
            .setRequired(true)
            .addChoice("right", "right hand")
            .addChoice("left", "left hand")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("brawl")
        .setDescription("Brawling Skill Attack")
    ),
  async execute(interaction) {

    
  }}