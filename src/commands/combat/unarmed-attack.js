const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const skillCheck = require("../../modules/skillCheck.js");
const Character = require("../../models/playerCharacter.js");
const mongoose = require("mongoose");
const meleeUnarmedAttack = require("../../modules/meleeUnarmedAttack.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unarmed-attack")
    .setDescription("Make an unarmed melee attack.")
    .addStringOption((option) =>
      option
        .setName("cyberarm")
        .setDescription("Is your character attacking with a cyberarm?")
        .addChoice("Yes", "yes")
        .addChoice("No", "no")
        .setRequired(true)
    )
    //!! Add logic that reflects the change in BODY stat when using a cyberarm.
    .addStringOption((option) =>
      option
        .setName("target")
        .setDescription("Choose a target on the enemy to attack.")
        .addChoice("Body", "Body")
        .addChoice("Head (-8 to Skillcheck)", "Head")
        .addChoice("Hand (-8 to Skillcheck)", "Hand")
        .addChoice("Leg (-8 to Skillcheck)", "Leg")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    const targetInput = interaction.options.getString("target");
    const targetModifier = () => {
      if (targetInput != "Body") {
        return 8;
      }
    };

    const sc = skillCheck(pc, ["brawling"]);
    const atk = meleeUnarmedAttack(pc, targetInput);

    console.log(atk);

    if (targetInput == "Body") {
      //** Unarmed Melee Attack to the Body */

      const bodyEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic(
            "Unarmed Melee Attack | Target: Body"
          )}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${sc.roll.result} ${sc.roll.critMsg}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `Target's ${bold("DEX + Evasion Skill + d10")}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${atk.dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      //** Unarmed Melee Attack Crit Injury Embed */
      const bodyCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(atk.dmg.injury.name)}`)
        .addFields(
          {
            name: `${underscore("Bonus DMG")}`,
            value: `5`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${atk.dmg.injury.effect}`,
            inline: false,
          }
        )
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      if (atk.dmg.isCrit == false) {
        await interaction.reply({ embeds: [bodyEmbed] });
      } else if (atk.dmg.isCrit == true) {
        await interaction.reply({ embeds: [bodyEmbed, bodyCritInjury] });
      }
    }
    if (targetInput != "Body") {
      //** Unarmed Melee Attack Aimed */

      const aimBonusEffect = (target) => {
        if (target == "Head") {
          return `${bold("x2")} DMG that gets through head armor.`;
        } else if (target == "Hand") {
          return `If DMG gets through armor, target drops item of choice.`;
        } else if (target == "Leg") {
          return `If DMG gets through armor, target suffers ${bold(
            "Broken Leg"
          )} (see pg.187).`;
        }
      };

      const bodyEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic(
            "Unarmed Melee Attack | Target:"
          )} ${italic(targetInput)}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${sc.roll.display} - 8`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${sc.roll.result - 8} ${sc.roll.critMsg}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `Target's ${bold("DEX + Evasion Skill + d10")}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${atk.dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          },
          {
            name: `${underscore("Bonus Effect")}`,
            value: `${aimBonusEffect(targetInput)}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      //** Unarmed Melee Attack Crit Injury Embed */
      const bodyCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(atk.dmg.injury.name)}`)
        .addFields(
          {
            name: `${underscore("Bonus DMG")}`,
            value: `5`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${atk.dmg.injury.effect}`,
            inline: false,
          }
        )
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      if (atk.dmg.isCrit == false) {
        await interaction.reply({ embeds: [bodyEmbed] });
      } else if (atk.dmg.isCrit == true) {
        await interaction.reply({ embeds: [bodyEmbed, bodyCritInjury] });
      }
    }
  },
};
