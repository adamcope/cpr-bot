const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const genArch = require("../../modules/netArchitecture.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate-net")
    .setDescription("Randomly generate NET architecture.")
    .addIntegerOption((option) =>
      option
        .setName("floors")
        .setDescription("Number of floors.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rank")
        .setDescription("Set the difficulty of the NET Architecture.")
        .addChoice("Basic", "basic")
        .addChoice("Standard", "standard")
        .addChoice("Uncommon", "uncommon")
        .addChoice("Advanced", "advanced")
        .setRequired(true)
    ),

  async execute(interaction) {
    const floorInput = interaction.options.getInteger("floors");
    const rankInput = interaction.options.getString("rank");

    const netArray = genArch(floorInput, rankInput);

    let lobby = [];
    let floors = [];
    for (let i = 0; i < 2; i++) {
      lobby.push(`[${i + 1}]⌬{{ ${netArray[i]}\n`);
    }
    for (let i = 2; i < netArray.length; i++) {
      floors.push(`[${i + 1}]⌬{{ ${netArray[i]}\n`);
    }
    for (let i = netArray.length; i < 10; i++) {
      floors.push(" ");
    }

    const architectureEmbed = new MessageEmbed()
      .setColor("DARK_PURPLE")
      .setTitle(`NET Architecture - ${rankInput.toUpperCase()}`)
      .addFields(
        {
          name: `${underscore("Lobby")}`,
          value: `${lobby[0]} ${lobby[1]}`,
          inline: false,
        },
        {
          name: `${underscore("Floors")}`,
          value: `${floors[0]} ${floors[1]} ${floors[2]} ${floors[3]} ${floors[4]} ${floors[5]} ${floors[6]}`,
          inline: false,
        }
      );

    console.log(netArray);
    await interaction.reply({ embeds: [architectureEmbed] });
  },
};
