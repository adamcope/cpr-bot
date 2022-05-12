const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const rangedAttack = require("../../modules/rangedAttack.js");
const lib = require("../../modules/library");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("archery")
    .setDescription("Fire a Bow or Crossbow")
    .addStringOption((option) =>
      option
        .setName("weapon")
        .setDescription("Weapon name.")
        .addChoice("Bow", "bow")
        .addChoice("Crossbow", "crossbow")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("distance")
        .setDescription("Distance to target in m/yds.")
        .addChoice("0 - 6 m/yds", 5)
        .addChoice("7 - 12 m/yds", 8)
        .addChoice("13 - 25 m/yds", 14)
        .addChoice("26 - 50 m/yds", 27)
        .addChoice("51 - 100 m/yds", 52)
        .addChoice("101 - 200 m/yds", 102)
        .addChoice("201 - 400 m/yds", 202)
        .addChoice("401 - 800 m/yds", 402)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("arrow-type")
        .setDescription("Select Arrow type. Must be equipped in Inventory.")
        .addChoice("Basic", "Basic Arrow")
        .addChoice("Armor-Piercing", "Armor-Piercing Arrow")
        .addChoice("Biotoxin", "Biotoxin Arrow")
        .addChoice("Expansive", "Expansive Arrow")
        .addChoice("Incendiary", "Incendiary Arrow")
        .addChoice("Poison", "Poison Arrow")
        .addChoice("Rubber", "Rubber Arrow")
        .addChoice("Sleep", "Sleep Arrow")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("aim")
        .setDescription("Specify target.")
        .addChoice("Body", "Body")
        .addChoice("Head (-8 to Skill Check)", "Head")
        .addChoice("Hand (-8 to Skill Check)", "Hand")
        .addChoice("Leg (-8 to Skill Check)", "Leg")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const weaponInput = interaction.options.getString("weapon").split(" ");
    const distanceInput = interaction.options.getInteger("distance");
    const target = interaction.options.getString("aim");
    const arrowType = interaction.options.getString("arrow-type");
    const ammo = lib.ammo.find((x) => x.name == arrowType);

    const ra = rangedAttack(pc, weaponInput, distanceInput, target);

    const quiver = pc.ammo.find((x) => x.name == arrowType);
    const index = pc.ammo.findIndex((x) => x.name == arrowType);

    if (!ra) {
      const notEquipped = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Archery")}`)
        .setDescription(`Bow not equipped.`)
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [notEquipped], ephemeral: true });
    } else if (ra.weapon.ammo.count < 1) {
      const outOfAmmo = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Archery")}`)
        .setDescription(`Out of Ammo.`)
        .setThumbnail(
          `https://i.pinimg.com/originals/9a/b4/67/9ab46702d1f0669a0ae40464b25568f2.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [outOfAmmo], ephemeral: true });
    } else if (!quiver) {
      const outOfAmmo = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Archery")}`)
        .setDescription(`Ammo Not Equipped.`)
        .setThumbnail(
          `https://i.pinimg.com/originals/9a/b4/67/9ab46702d1f0669a0ae40464b25568f2.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [outOfAmmo], ephemeral: true });
    } else if (target != "Body") {
      const aimIsHit = () => {
        if (ra.sc.roll.result - 8 > ra.dv) {
          return true;
        } else {
          return false;
        }
      };
      ra.isHit = aimIsHit();

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

      const aimMissEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Archery - Target:")} ${italic(
            target
          )}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display} - 8`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result - 8} ${italic(bold("MISS!"))}`,
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

      const aimHitEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Archery - Target:")} ${italic(
            target
          )}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display} - 8`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result - 8} ${italic(bold("HIT!"))}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `${ra.dv}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${ra.dmg.result}`,
            inline: false,
          },
          {
            name: `${underscore("Ammo")}`,
            value: `${ammo.name}`,
            inline: true,
          },
          {
            name: `${underscore("Ammo Effect")}`,
            value: `${ammo.effect}`,
            inline: true,
          },
          {
            name: `${underscore("Target Effect")}`,
            value: `${aimBonusEffect(target)}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      const critInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(ra.dmg.injury.name)}`)
        .addFields(
          {
            name: `${underscore("Bonus DMG")}`,
            value: `5`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ra.dmg.injury.effect}`,
            inline: false,
          }
        )
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      if (ra.isHit == false) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({ embeds: [aimMissEmbed] });
      } else if (ra.isHit == true && ra.dmg.isCrit == false) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({ embeds: [aimHitEmbed] });
      } else if (ra.isHit == true && ra.dmg.isCrit == true) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({
          embeds: [aimHitEmbed, critInjury],
        });
      }
    }
    if (target == "Body") {
      const rangedAttackEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Archery")}`)
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result} ${italic(bold("HIT!"))}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `${ra.dv}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${ra.dmg.result}`,
            inline: false,
          },
          {
            name: `${underscore("Ammo")}`,
            value: `${ammo.name}`,
            inline: true,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ammo.effect}`,
            inline: true,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      const critInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(ra.dmg.injury.name)}`)
        .addFields(
          {
            name: `${underscore("Bonus DMG")}`,
            value: `5`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ra.dmg.injury.effect}`,
            inline: false,
          }
        )
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

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
            value: `${ra.sc.roll.result} ${italic(bold("MISS!"))}`,
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

      if (ra.dmg.isCrit == true && ra.isHit == true) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({ embeds: [rangedAttackEmbed, critInjury] });
      } else if (ra.dmg.isCrit == false && ra.isHit == true) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({ embeds: [rangedAttackEmbed] });
      } else if (ra.isHit == false) {
        pc.ammo[index].amount = quiver.amount - 1;

        await pc.save();
        await interaction.reply({ embeds: [missEmbed] });
      }
    }
  },
};
