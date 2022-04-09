const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const meleeWeaponAttack = require("../../modules/meleeWeaponAttack.js");
const Character = require("../../models/playerCharacter.js");
const skillCheck = require("../../modules/skillCheck.js");
const mongoose = require("mongoose");
const { attackDmg } = require("../../modules/mechanics.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("melee")
    .setDescription("Make a melee attack. (Weapon or Unarmed)")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Attack with Melee Weapon, or attack Unarmed.")
        .addChoice("Weapon", "weapon")
        .addChoice("Unarmed", "unarmed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("weapon-name")
        .setDescription("Name of Weapon")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("aim")
        .setDescription("Choose a target on the enemy to attack.")
        .addChoice("Head", "head")
        .addChoice("Hand", "hand")
        .addChoice("Leg", "leg")
        .setRequired(false)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const typeInput = interaction.getString("type");
    const weaponInput = interaction.getString("weapon").split(" ");
    const aimInput = interaction.getStrin("aim");

    const sc = skillCheck(pc, ["brawling"]);
    const mwa = meleeWeaponAttack(pc, weaponInput);
    

    if (!sc || !mwa) {
        return
    } else if (!aim && !weaponInput) {
        const missEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack - Autofire")}`)
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `${ra.dv}`,
            inline: true,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });
    }
  },
};
