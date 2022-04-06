const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const skillCheck = require("../../modules/skillCheck");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skill-check")
    .setDescription("Roll Skill Check")
    .addStringOption((option) =>
      option.setName("skill").setDescription("Name of Skill").setRequired(true)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    const skill = interaction.options.getString("skill").split(" ");

    const sc = skillCheck(pc, skill);

    const characterEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${pc.characterName} - ${italic(sc.skill.name + ' Check')}`)
      .addFields(
        { name: `${underscore("Roll")}`, value: `${sc.roll.display}`, inline: false },
        { name: `${underscore("Result")}`, value: `${bold(sc.roll.result)}`, inline: false },
      )
      .setThumbnail(`${pc.characterImgUrl}`)
      .setFooter({ text: `Player: @${pc.username}` });

    await interaction.reply({ embeds: [characterEmbed] });
  },
};
