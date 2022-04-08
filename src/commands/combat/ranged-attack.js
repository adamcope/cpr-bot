const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const rangedAttack = require("../../modules/rangedAttack.js");
const suppFire = require("../../modules/suppFire.js");
const skillCheck = require("../../modules/skillCheck.js");
const { attackDmg } = require("../../modules/mechanics.js");
const discharge = require("../../modules/shoot.js");

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
        .setDescription("Distance to target in m/yds.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("altfire-modes")
        .setDescription("Altfire modes.")
        .addChoice("Autofire", "autofire")
        .addChoice("Suppressive-Fire", "suppressive-fire")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("aim")
        .setDescription("Specify target. (-8 to Skill Check)")
        .addChoice("Head", "Head")
        .addChoice("Hand", "Hand")
        .addChoice("Leg", "Leg")
        .setRequired(false)
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const weaponInput = interaction.options.getString("weapon").split(" ");
    const distanceInput = interaction.options.getInteger("distance");
    const specModes = interaction.options.getString("altfire-modes");
    const target = interaction.options.getString("aim");

    const ra = rangedAttack(pc, weaponInput, distanceInput);

    const index = pc.weapons.findIndex((x) => x.name == ra.weapon.name);

    if (!ra) {
      const notEquipped = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack")}`)
        .setDescription(`Weapon not equipped.`)
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [notEquipped], ephemeral: true });
    } else if (ra.weapon.ammo.count < 1) {
      const outOfAmmo = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack")}`)
        .setDescription(`Out of Ammo.`)
        .setThumbnail(
          `https://i.pinimg.com/originals/9a/b4/67/9ab46702d1f0669a0ae40464b25568f2.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [outOfAmmo], ephemeral: true });
    } else if (
      specModes == "autofire" &&
      ra.weapon.isAutofire == true &&
      ra.weapon.ammo.count < 9
    ) {
      const sc = skillCheck(pc, ["autofire"]);
      const afDmg = attackDmg("2d6");
      const afDmgMultiplier = sc.roll.result - ra.dv;
      const multiplierLimit = ra.weapon.afMultiplier;

      const multiplier = (x) => {
        if (x > multiplierLimit) {
          return multiplierLimit;
        } else {
          return x;
        }
      };

      const dmgMult = multiplier(afDmgMultiplier);

      const autofireHit = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack - Autofire")}`)
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${sc.roll.result}`,
            inline: true,
          },
          {
            name: `${underscore("DV")}`,
            value: `${ra.dv}`,
            inline: true,
          },
          {
            name: `${underscore("DMG")}`,
            value: `${afDmg.result * dmgMult}`,
            inline: false,
          },
          {
            name: `${underscore("Ammo")}`,
            value: `${ra.weapon.ammo.loaded}`,
            inline: true,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ra.weapon.ammo.effect}`,
            inline: true,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      const critInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(afDmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${afDmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      const autofireMiss = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack - Autofire")}`)
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${sc.roll.display}`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${sc.roll.result}`,
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
      if (afDmgMultiplier < 1) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 10;
        await pc.save();
        await interaction.reply({ embeds: [autofireMiss] });
      } else if (afDmgMultiplier > 0 && afDmg.isCrit == true) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 10;
        await pc.save();
        await interaction.reply({ embeds: [autofireHit, critInjury] });
      } else if (afDmgMultiplier > 0) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 10;
        await pc.save();
        await interaction.reply({ embeds: [autofireHit] });
      }
    } else if (specModes == "autofire" && ra.weapon.isAutofire == false) {
      const noAutofireEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack - Autofire")}`)
        .setDescription(`Autofire not available for ${ra.weapon.name}`)
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [noAutofireEmbed], ephemeral: true });
    } else if (
      specModes == "suppressive-fire" &&
      ra.weapon.isAutofire == false
    ) {
      const noSuppFireEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Ranged Attack - Suppressive-Fire")}`
        )
        .setDescription(`Suppressive-Fire not available for ${ra.weapon.name}`)
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [noSuppFireEmbed], ephemeral: true });
    } else if (
      specModes == "suppressive-fire" &&
      ra.weapon.isAutofire == true &&
      ra.weapon.ammo.count < 9
    ) {
      const sc = skillCheck(pc, ["autofire"]);
      const sf = suppFire(ra.weapon);

      const suppressiveFireEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Ranged Attack - Suppressive Fire")}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${bold("REF ") + sc.stat.value} + ${
              bold("Autofire ") + sc.skill.value
            } + ${sc.d10.display}`,
            inline: true,
          },
          {
            name: `${underscore("DV Result")}`,
            value: `${bold(sc.roll.result)}`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${sf.displayText}`,
            inline: false,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      pc.weapons[index].ammo = ra.weapon.ammo.count - 10;
      await pc.save();

      await interaction.reply({ embeds: [suppressiveFireEmbed] });
    } else if (target != undefined) {
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
          return `Multiply the damage that gets through your target's head armor by ${bold(
            "2"
          )}.`;
        } else if (target == "Hand") {
          return `If a single point of damage gets through your target's body armor, your target drops one item of your choice held in their hands. It lands on the ground in front of them.`;
        } else if (target == "Leg") {
          return `If a single point of damage gets through your target's body armor, your target also suffers the ${bold(
            "Broken Leg"
          )} Critical Injury if they have any legs left that aren't broken.`;
        }
      };

      const aimMissEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(
          `${pc.characterName} - ${italic("Ranged Attack - Aimed Shot")}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display} - 8`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result - 8}`,
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
          `${pc.characterName} - ${italic("Ranged Attack - Aimed Shot")}`
        )
        .addFields(
          {
            name: `${underscore("Roll")}`,
            value: `${ra.sc.roll.display} - 8`,
            inline: false,
          },
          {
            name: `${underscore("Result")}`,
            value: `${ra.sc.roll.result - 8}`,
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
            value: `${ra.weapon.ammo.loaded}`,
            inline: true,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ra.weapon.ammo.effect}`,
            inline: true,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      const critInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(ra.dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${ra.dmg.injury.effect}`,
          inline: false,
        })
        .setThumbnail(
          `https://64.media.tumblr.com/38c2289f4fb32da7afa9e3b4c1eba656/tumblr_nv25v6qn7b1ud4rmfo1_400.gif`
        )
        .setFooter({ text: `Player: @${pc.username}` });

      const targetEffect = new MessageEmbed()
        .setColor("RED")
        .setTitle(`Target - ${italic(target)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${aimBonusEffect(target)}`,
          inline: false,
        })
        .setFooter({ text: `Player: @${pc.username}` });
      if (ra.isHit == false) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({ embeds: [aimMissEmbed] });
      } else if (ra.isHit == true && ra.dmg.isCrit == false) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({ embeds: [aimHitEmbed, targetEffect] });
      } else if (ra.isHit == true && ra.dmg.isCrit == true) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({
          embeds: [aimHitEmbed, targetEffect, critInjury],
        });
      }
    } else if (specModes == undefined && target == undefined) {
      const rangedAttackEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Ranged Attack")}`)
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
          },
          {
            name: `${underscore("DMG")}`,
            value: `${ra.dmg.result}`,
            inline: false,
          },
          {
            name: `${underscore("Ammo")}`,
            value: `${ra.weapon.ammo.loaded}`,
            inline: true,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${ra.weapon.ammo.effect}`,
            inline: true,
          }
        )
        .setThumbnail(`${pc.characterImgUrl}`)
        .setFooter({ text: `Player: @${pc.username}` });

      const critInjury = new MessageEmbed()
        .setColor("DARK_ORANGE")
        .setTitle(`Critical Injury - ${italic(ra.dmg.injury.name)}`)
        .addFields({
          name: `${underscore("Effect")}`,
          value: `${ra.dmg.injury.effect}`,
          inline: false,
        })
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

      if (ra.dmg.isCrit == true && ra.isHit == true) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({ embeds: [rangedAttackEmbed, critInjury] });
      } else if (ra.dmg.isCrit == false && ra.isHit == true) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({ embeds: [rangedAttackEmbed] });
      } else if (ra.isHit == false) {
        pc.weapons[index].ammo = ra.weapon.ammo.count - 1;
        await pc.save();
        await interaction.reply({ embeds: [missEmbed] });
      }
    }
  },
};
