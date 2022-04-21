const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const skillCheck = require("../../modules/skillCheck.js");
const Character = require("../../models/playerCharacter.js");
const mongoose = require("mongoose");
const { attackDmg } = require("../../modules/mechanics.js");
const lib = require("../../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("melee-weapon-attack")
    .setDescription("Make a melee weapon attack.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Melee Weapon Type")
        .addChoice("Medium Melee Weapon", "medium_melee_weapon")
        .addChoice("Heavy Melee Weapon", "heavy_melee_weapon")
        .addChoice("Very Heavy Melee Weapon", "very_heavy_melee_weapon")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("target")
        .setDescription("Choose a target on the enemy to attack.")
        .addChoice("Body", "body")
        .addChoice("Head (-8 to Skillcheck)", "head")
        .addChoice("Hand (-8 to Skillcheck)", "hand")
        .addChoice("Leg (-8 to Skillcheck)", "leg")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    const typeInput = interaction.options.getString("type");
    const targetInput = interaction.options.getString("target");
    const targetModifier = () => {
      if (targetInput != "body") {
        return 8;
      }
    };
    const weapon = lib.meleeWeapons.find((x) => x.ref == typeInput);
    const sc = skillCheck(pc, ["melee", "weapons"]);
    const dmg = attackDmg(weapon.dmg);

    if (targetInput == "body") {
      //** Melee Weapon Attack to the Body Embed */

      const bodyEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic(
            "Melee Weapon Attack | Target: Body"
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
            value: `${dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      //** Melee Weapon Attack Crit Injury Embed */
      const bodyCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${dmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      if (dmg.isCrit == false) {
        await interaction.reply({ embeds: [bodyEmbed] });
      } else if (dmg.isCrit == true) {
        await interaction.reply({ embeds: [bodyEmbed, bodyCritInjury] });
      }
    }
    if (targetInput != "body") {
      //** Melee Weapon Attack to the Body Embed */

      const targetName = (targetInput) => {
        if ((targetInput = "head")) {
          return "Head";
        }
        if ((targetInput = "hand")) {
          return "Hand";
        }
        if ((targetInput = "leg")) {
          return "Leg";
        }
      };

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
            "Melee Weapon Attack | Target:"
          )} ${italic(targetName(targetInput))}`
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
            value: `${dmg.result}\n ${italic("(if Hit Check Successful)")}`,
            inline: false,
          },
          {
            name: `${underscore("Bonus Effect")}`,
            value: `${aimBonusEffect(targetName(targetInput))}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      //** Melee Weapon Attack Crit Injury Embed */
      const bodyCritInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${dmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      if (dmg.isCrit == false) {
        await interaction.reply({ embeds: [bodyEmbed] });
      } else if (dmg.isCrit == true) {
        await interaction.reply({ embeds: [bodyEmbed, bodyCritInjury] });
      }
    }
  },
};
