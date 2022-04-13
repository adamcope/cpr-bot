const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { italic, underscore } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weapons")
    .setDescription("Displays the weapons in your inventory. (DISABLED)")
    .setDefaultPermission(false),
  async execute(interaction) {

    const weaponsEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${charName} - ${italic("Weapons")}`)
      .setThumbnail(`${thumbnail}`)
      .setFooter({ text: `@${char.username} - Player` })
      .addFields(
        {
          name: `${underscore("Weapons")}`,
          value: `${x}\n ${x}\n ${x}\n ${x}\n ${x}`,
          inline: true,
        },
        {
          name: `${underscore("Ammo")}`,
          value: `${x}\n ${x}\n ${x}\n ${x}\n ${xo}`,
          inline: true,
        },
        {
          name: `${underscore("Ammo Type")}`,
          value: `${x}\n ${x}\n ${x}\n ${x}\n ${x}`,
          inline: true,
        }
      );

    await interaction.reply({ embeds: [weaponsEmbed], ephemeral: true });
  },
};
