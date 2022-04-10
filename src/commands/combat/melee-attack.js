const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const meleeWeaponAttack = require("../../modules/meleeWeaponAttack.js");
const meleeUnarmedAttack = require("../../modules/meleeUnarmedAttack.js");
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
        .setDescription("Name of Melee Weapon")
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

    const typeInput = interaction.options.getString("type");
    try {
      const weaponInput = interaction.options.getString("weapon").split(" ");
      const aimInput = interaction.options.getString("aim");

      //** Unarmed Melee Attack Embed */
      const umaEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Unarmed Melee Attack - Brawling")}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${uma.sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${uma.sc.roll.result} ${uma.sc.roll.critMsg}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `Target's ${bold("DEX + Evasion Skill + d10")}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${uma.dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      //** Unarmed Melee Crit Injury Embed */
      const umaCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(uma.dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${uma.dmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

        //** Melee Weapon Attack Embed */
        const mwaEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Melee Weapon Attack - ")}${italic(
            mwa.weapon.name
          )}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${mwa.sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${mwa.sc.roll.result} ${mwa.sc.roll.critMsg}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `Target's ${bold("DEX + Evasion Skill + d10")}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${mwa.dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

        //** Melee Weapon Attack Crit Embed */
        const mwaCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(mwa.dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${mwa.dmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

    } catch (error) {
      weaponInput = undefined;
      aimInput = undefined;
    }

    const sc = skillCheck(pc, ["brawling"]);
    const mwa = meleeWeaponAttack(pc, weaponInput);
    const uma = meleeUnarmedAttack(pc);

    if (!sc) {
      return;
    } else if (!aimInput && !weaponInput && uma.dmg.isCrit == false) {
      await interaction.reply({ embeds: [umaEmbed] });
    } else if (!aimInput && !weaponInput && uma.dmg.isCrit == true) {
      await interaction.reply({ embeds: [umaEmbed, critInjury] });
    } else if (!aimInput && mwa.dmg.isCrit == false) {
      await interaction.reply({embeds: [mwaEmbed]})
    } else if (!aimInput && mwa.dmg.isCrit == false) {
      await interaction.reply({embeds: [mwaEmbed, mwaCritInjury]})
    }
  },
};
