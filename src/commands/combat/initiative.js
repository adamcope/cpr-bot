const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("initiative")
    .setDescription("Roll Initiative"),
  async execute(interaction) {

    const characterEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${pc.characterName} - ${bold('Inititiative')}`)
      .setThumbnail(`${pc.characterImgUrl}`)
      .setFooter({ text: `Player: @${pc.username}` })
      .addFields(
        { name: `${underscore('Roll')}`, value: ``, inline: true },
        { name: `${underscore('Result')}`, value: ``, inline: true }
        );

    await interaction.reply({ embeds: [characterEmbed] });
  },
};
