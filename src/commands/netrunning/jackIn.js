const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const Character = require("../../models/playerCharacter.js");
const Netarch = require("../../models/netSchema.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("jack-in")
    .setDescription("Jack In to access point using Access Point Key.")
    .addStringOption((option) =>
      option.setName("key").setDescription("Access Point Key").setRequired(true)
    ),

  async execute(interaction) {
    const idInput = interaction.options.getString("key");

    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const net = await Netarch.findOne({
      netID: idInput,
    });

    const netrunner = {
      id: interaction.member.id,
      name: pc.characterName,
      floor: 1,
    };

    console.log(net)

    net.netRunners.push(netrunner);
    net.save()

    const floor_one = net.floors[0]

    console.log(floor_one.name)

    

    await interaction.reply(`\`\`Successfully [Jacked In]\`\``)
  },
};
