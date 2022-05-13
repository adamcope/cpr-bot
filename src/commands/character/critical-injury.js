const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const { critInjuryInfo } = require("../../modules/mechanics");
const lib = require("../../modules/library");

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

    const target = interaction.options.getSubcommand();
    const index =
      Math.floor(Math.random() * 6) + 1 + (Math.floor(Math.random() * 6) + 1);

    const critTarget = () => {
      if (target != "head") {
        return critInjuryInfo.find(
          (x) => x.injury == lib.critInjuryTable.body[index]
        );
      }
      if (target == "head") {
        return critInjuryInfo.find(
          (x) => x.injury == lib.critInjuryTable.head[index]
        );
      }
    };
    const injury = critTarget();

    pc.criticalInjuries.push(injury.injury);
    await pc.save();

    interaction.reply(`${bold(injury.injury)} added to Character status.`);
  },
};
