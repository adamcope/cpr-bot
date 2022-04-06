const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const rangedAttack = require("../../modules/rangedAttack.js");
const suppFire = require("../../modules/suppFire.js")
const skillCheck = require("../../modules/skillCheck.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ranged-attack")
    .setDescription("Make a Ranged Attack.")
    .addStringOption((option) =>
      option.setName("weapon").setDescription("Weapon name.").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("distance")
        .setDescription("Distance to target.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("special-modes")
        .setDescription("Special fire modes.")
        .addChoice("Autofire", "autofire")
        .addChoice("Suppressive-fire", "suppressive-fire")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("aim")
        .setDescription("Specify target. (adds +8 to DV)")
        .addChoice("Head", "head")
        .addChoice("Hand", "hand")
        .addChoice("Leg", "leg")
        .setRequired(false)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    const writeDB = await Character.find({
      userID: `${interaction.member.id}`,
    });

    const weaponInput = interaction.options.getString("weapon").split(" ");
    const distanceInput = interaction.options.getInteger("distance");
    const specModes = interaction.options.getString("special-modes");
    const target = interaction.options.getString("aim");
    

    const ra = rangedAttack(pc, weaponInput, distanceInput);

    if (specModes == "autofire" && ra.weapon.isAutofire == true) {
      const autofireEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack - Autofire")}`)
        .setDescription(
          `${underscore(bold("Roll:"))} ${ra.sc.roll.display}\n\n${underscore(
            bold("Result:")
          )} ${ra.sc.roll.result} ${ra.sc.roll.critMsg}`
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [autofireEmbed] });
    } else if (
      specModes == "suppressive-fire" &&
      ra.weapon.isAutofire == true
    ) {
        const sc = skillCheck(pc, ['autofire'])
        const sf = suppFire(ra.weapon)

      const suppressiveFireEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Ranged Attack - Suppressive Fire")}`
        )
        .addFields(
            { name: `${underscore("Roll")}`, value: `${bold("REF ") + sc.stat.value} + ${bold("Autofire ") + sc.skill.value} + ${sc.d10.display}`, inline: true },
            { name: `${underscore("DV Result")}`, value: `${bold(sc.roll.result)}`, inline: false },
            { name: `${underscore("Effect")}`, value: `${sf.displayText}`, inline: false }
            )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [suppressiveFireEmbed] });
    } else if (target != undefined) {
      const aimEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Ranged Attack - Aimed Shot")}`
        )
        .setDescription(
          `${underscore(bold("Roll:"))} ${ra.sc.roll.display}\n\n${underscore(
            bold("Result:")
          )} ${ra.sc.roll.result} ${ra.sc.roll.critMsg}`
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [aimEmbed] });
    } else if (specModes == undefined && target == undefined) {
      const rangedAttackEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack")}`)
        .setDescription(
          `${underscore(bold("Roll:"))} ${ra.sc.roll.display}\n\n${underscore(
            bold("Result:")
          )} ${ra.sc.roll.result} ${ra.sc.roll.critMsg}`
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [rangedAttackEmbed] });
    }
  },
};
