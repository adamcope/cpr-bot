const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const blackIcelib = require("../../JSON/blackICE.json");
const nonBlackIcelib = require("../../JSON/nonBlackICE.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rez")
    .setDescription(
      "Posts the information of a particular program (BlackICE or Non-BlackICE)."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("non-blackice")
        .setDescription("Display information for Non-BlackICE programs")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of Non-BlackICE")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("blackice")
        .setDescription("Display information on BlackICE programs.")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Name of BlackICE.")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });
    const prgrm = interaction.options.getString("name");

    const blackICE = blackIcelib.find((x) => x.ref == prgrm.toLowerCase());
    const nonBlackICE = nonBlackIcelib.find(
      (x) => x.ref == prgrm.toLowerCase()
    );  

    if (nonBlackICE != undefined) {
      const nonBlackICEEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("BlackICE")}`)
        .addFields(
          {
            name: `${underscore("Name")}`,
            value: `${nonBlackICE.name}`,
            inline: true,
          },
          {
            name: `${underscore("Class")}`,
            value: `${nonBlackICE.progClass}`,
            inline: true,
          },
          {
            name: `${underscore("Stats")}`,
            value: `${bold("ATK")} ${nonBlackICE.atk} | ${bold("DEF")} ${
              nonBlackICE.def
            } | ${bold("REZ")} ${nonBlackICE.rez}`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${nonBlackICE.effect}`,
            inline: false,
          }
        )
        .setThumbnail(`${nonBlackICE.thumbURL}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [nonBlackICEEmbed] });
    } else if (blackICE != undefined) {
      const blackICEEmbed = new MessageEmbed()
        .setColor("#7a1212")
        .setTitle(`${pc.characterName} - ${italic("Non-BlackICE")}`)
        .addFields(
          {
            name: `${underscore("Name")}`,
            value: `${blackICE.name}`,
            inline: true,
          },
          {
            name: `${underscore("Class")}`,
            value: `${blackICE.progClass}`,
            inline: true,
          },
          {
            name: `${underscore("Stats")}`,
            value: `${bold("PER")} ${blackICE.per} | ${bold("SPD")} ${
              blackICE.spd
            } | ${bold("ATK")} ${blackICE.atk} | ${bold("DEF")} ${
              blackICE.def
            } | ${bold("REZ")} ${blackICE.rez}`,
            inline: false,
          },
          {
            name: `${underscore("Effect")}`,
            value: `${blackICE.effect}`,
            inline: false,
          }
        )
        .setThumbnail(`${blackICE.thumbURL}`)
        .setFooter({ text: `Player: @${pc.username}` });

      await interaction.reply({ embeds: [blackICEEmbed] });
    } else {
      await interaction.reply("``Invalid Program Name``");
    }
  },
};
