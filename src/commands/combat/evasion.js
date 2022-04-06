const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const statCheck = require("../../modules/statD10.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evasion")
    .setDescription("Roll Evasion"),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    const statD10 = statCheck(pc, "dex");

    const characterEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${pc.characterName} - ${italic("Evasion")}`)
      .setDescription(
        `${underscore(bold("Roll:"))} ${statD10.display}\n\n${underscore(
          bold("Result:")
        )} ${statD10.result} ${statD10.critMsg}`
      )
      .setThumbnail(`${pc.characterImgUrl}`)
      .setFooter({ text: `Player: @${pc.username}` })

    await interaction.reply({ embeds: [characterEmbed] });
  },
};
