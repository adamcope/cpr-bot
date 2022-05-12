const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Display your Character's full status."),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const isStable = () => {
      if (pc.isStable == true) {
        return "[Stable]"
      } else { return "[UNSTABLE]" }
    }
    const isSeriouslyWounded = () => {
      if (pc.hp[0] == 0) {
        return "Mortally Wounded\n(see pg. 186)";
      } else if (pc.hp[0] == pc.hp[1]) {
        return "N/A";
      } else if (pc.hp[0] <= pc.hp[1] / 2) {
        return "Seriously Wounded\n(see pg. 186)";
      } else if (pc.hp[0] > pc.hp[1] / 2) {
        return "Lightly Wounded";
      }
    };

    const isCriticalInjuries = () => {
      if (pc.criticalInjuries == "") {
        return "None";
      } else {
        return pc.criticalInjuries.join(`\n`);
      }
    };
    const weaponList = () => {
      let list = [];
      const listPush = () => {
        for (let i = 0; i < pc.weapons.length; i++) {
          if (
            pc.weapons[i].name == "Medium Melee Weapon" ||
            pc.weapons[i].name == "Heavy Melee Weapon" ||
            pc.weapons[i].name == "Very Heavy Melee Weapon"
          ) {
            list.push(pc.weapons[i].name);
          } else {
            list.push(pc.weapons[i].name + ": " + bold(pc.weapons[i].ammo) + " " + italic(pc.weapons[i].ammoLoaded));
          }
        }
      };
      listPush();
      if (list == "") {
        return "none";
      } else {
        return list;
      }
    };

    const ammoList = () => {
      let list = [];

      pc.ammo.forEach((x) => list.push(x.name + ": " + italic(x.amount)));
      if (list == "") {
        return "none";
      } else {
        return list;
      }
    };

    const statusEmbed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(`${pc.characterName} - ${italic("Status")}`)
      .addFields(
        {
          name: `${underscore("HP")}`,
          value: `${pc.hp[0]}/${pc.hp[1]}\n${isStable()}`,
          inline: true,
        },
        {
          name: `${underscore("Critical Injuries")}`,
          value: `${isCriticalInjuries()}`,
          inline: true,
        },
        {
          name: `${underscore("Trauma Status")}`,
          value: `${isSeriouslyWounded()}`,
          inline: true,
        },
        {
          name: `${underscore("Humanity")}`,
          value: `${pc.humanity[0]}/${pc.humanity[1]}`,
          inline: true,
        },
        {
          name: `${underscore("Eddies")}`,
          value: `Ɇ${pc.eb}`,
          inline: true,
        },
        {
          name: `${underscore("Stats")}`,
          value: `${bold("INT")} ${pc.stats.int[0]} | ${bold("REF")} ${
            pc.stats.ref[0]
          } | ${bold("DEX")} ${pc.stats.dex[0]} | ${bold("TECH")} ${
            pc.stats.tech[0]
          } | ${bold("COOL")} ${pc.stats.cool[0]}\n${bold("WILL")} ${
            pc.stats.will[0]
          } | ${bold("LUCK")} ${pc.stats.luck[0]}/${pc.stats.luck[1]} | ${bold(
            "MOVE"
          )} ${pc.stats.move[0]} | ${bold("BODY")} ${pc.stats.body[0]} | ${bold(
            "EMP"
          )} ${pc.stats.emp[0]}/${pc.stats.emp[1]}`,
          inline: false,
        },
        {
          name: `${underscore("Weapons")}`,
          value: `${weaponList().join(`\n`)}`,
          inline: true,
        },
        {
          name: `${underscore("Armor")}`,
          value: `${italic("HEAD")} - ${bold("SP")} ${
            pc.armor.head.sp
          }\n${italic("BODY")} - ${bold("SP")} ${pc.armor.body.sp}\n${italic(
            "SHIELD"
          )} - ${bold("SP")} ${pc.armor.shield.sp}`,
          inline: true,
        },
        {
          name: `${underscore("Ammo")}`,
          value: `${ammoList().join(`\n`)}`,
          inline: false,
        }
      )
      .setThumbnail(`${pc.characterImgUrl}`)
      .setFooter({ text: `Player: @${pc.username}` });

    await interaction.reply({ embeds: [statusEmbed] });
  },
};
