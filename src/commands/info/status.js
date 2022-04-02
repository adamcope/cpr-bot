const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, italic, underscore } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Posts your character's status"),
  async execute(interaction) {
 
    const characterEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${charName} - ${italic(role)} | ${ability}: ${rank}`)
      .setThumbnail(`${thumbnail}`)
      .setFooter({ text: `@${char.username} - Player` })
      .addFields(
        { name: "HP", value: `${currentHp}/${totalHp}`, inline: true },
        {
          name: "Critical Injuries",
          value: `${criticalInjuries()}`,
          inline: true,
        },
        {
          name: "Wounded",
          value: `${char.seriouslyWounded}`,
          inline: true,
        },
        {
          name: "EMP",
          value: `${char.stats.emp[0]}/${char.stats.emp[1]}`,
          inline: true,
        },
        {
          name: "LUCK",
          value: `${char.stats.luck[0]}/${char.stats.luck[1]}`,
          inline: true,
        },
        {
          name: "Humanity",
          value: `${char.humanity[0]}/${char.humanity[1]}`,
          inline: true,
        },
        {
          name: `${underscore("Weapon Drawn")}`,
          value: `${bold(`${weaponName}`)}`,
          inline: true,
        },
        {
          name: `${underscore("Ammo")}`,
          value: `${ammo()}`,
          inline: true,
        },
        {
          name: `${underscore("Ammo Type")}`,
          value: `${ammoType}`,
          inline: true,
        },
        {
          name: `${underscore("Armor")}`,
          value: `${bold("Head")}: ${char.armor.head.name}\n ${bold("Body")}: ${
            char.armor.body.name
          }\n ${bold("Shield")}: ${char.armor.shield.name}`,
          inline: true,
        },
        {
          name: `${underscore("SP")}`,
          value: `${char.armor.head.sp}\n ${char.armor.body.sp}\n ${char.armor.shield.sp}`,
          inline: true,
        }
      );
    try {
      seriouslyWounded();
      await interaction.reply({ embeds: [characterEmbed], ephemeral: true });
    } catch (error) {}
  },
};
