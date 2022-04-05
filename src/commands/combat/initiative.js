const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore } = require("@discordjs/builders");
const statCheck = require("../../modules/statD10.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("initiative")
    .setDescription("Roll Initiative"),
  async execute(interaction) {
    const pc = await Character.findOne({userID:`${interaction.member.id}`}).lean();

    const statD10 = statCheck(pc, 'ref')


    const characterEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${pc.characterName} - ${bold('Inititiative')}`)
      .setThumbnail(`${pc.characterImgUrl}`)
      .setFooter({ text: `Player: @${pc.username}` })
      .addFields(
        { name: `${underscore('Roll')}`, value: `${statD10.display}`, inline: true },
        { name: `${underscore('Result')}`, value: `${statD10.result}`, inline: true }
        );

    await interaction.reply({ embeds: [characterEmbed] });
  },
};
