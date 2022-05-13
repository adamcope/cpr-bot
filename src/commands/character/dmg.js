const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmg")
    .setDescription("Apply DMG to directly to your character's HP.")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Amount of DMG to apply").setRequired(true)
    ),

    //!! Add ablate armor option and function to calculate how much dmg passes through armor.

  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });
    const dmg = interaction.options.getInteger("amount");
    pc.hp[0] = pc.hp[0] - dmg;

    if (pc.hp[0] <= pc.hp[1]/2) {
        pc.isStable = false
    }

    await pc.save();

    interaction.reply("DMG applied.");
  },
};
