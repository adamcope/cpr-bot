const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ablate")
    .setDescription("Ablate armor")
    .addStringOption((option) =>
      option
        .setName("armor")
        .setDescription("Armor piece to ablate")
        .addChoice("Head", "Head")
        .addChoice("Body", "Body")
        .addChoice("Shield", "Shield")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount armor is ablated")
        .setRequired(true)
    ),

  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    if (interaction.options.getString("armor") == "Head"){
        pc.armor.head.sp = pc.armor.head.sp - interaction.options.getInteger("amount")
    }
    if (interaction.options.getString("armor") == "Body"){
        pc.armor.body.sp = pc.armor.body.sp - interaction.options.getInteger("amount")
    }
    if (interaction.options.getString("armor") == "Shield"){
        pc.armor.shield.sp = pc.armor.shield.sp - interaction.options.getInteger("amount")
    }
    await pc.save();

    interaction.reply(`${interaction.options.getString("armor")} Armor ablated by ${interaction.options.getInteger("amount")}.`);
  },
};
