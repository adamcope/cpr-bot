const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const genArch = require("../../modules/netArchitecture.js");
const Netarch = require("../../models/netSchema.js");

//!! Featur needs MAJOR OVERHAUL, while this can certainly work to generate simple 'branchless' NET Architecture,
//!! it needs to be much more robust to allow for more complex Architecture.

module.exports = {
  data: new SlashCommandBuilder()
    .setName("net-generate")
    .setDescription("Randomly generate NET Architecture.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Set the Architecture's name.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("floors")
        .setDescription("Number of floors.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rank")
        .setDescription("Set the difficulty of the NET Architecture.")
        .addChoice("Basic", "basic")
        .addChoice("Standard", "standard")
        .addChoice("Uncommon", "uncommon")
        .addChoice("Advanced", "advanced")
        .setRequired(true)
    ),

  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const floorInput = interaction.options.getInteger("floors");
    const rankInput = interaction.options.getString("rank");

    const netArray = genArch(floorInput, rankInput);

    const makeid = (length) => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    const netID = makeid(10);

    let netObject = {
      netID: netID,
      netName: nameInput,
      floors: [],
      netRunners: [],
      daemons: [],
    };

    

    for (let i = 0; i < netArray.length; i++) {
      netObject.floors.push({
        floor: i + 1,
        programs: [
          {
            id: makeid(9),
            name: netArray[i],
          },
        ],
      });
    }

    // This formats the netArray into an aesthetically pleasing (imo)
    // display for the embed.
    let lobby = [];
    let floors = [];
    for (let i = 0; i < 2; i++) {
      lobby.push(`[${i + 1}]⌬[${netArray[i]}\n`);
    }
    for (let i = 2; i < netArray.length; i++) {
      floors.push(`[${i + 1}]⌬[${netArray[i]}\n`);
    }
    for (let i = netArray.length; i < 10; i++) {
      floors.push(" ");
    }
    
    const netarch = new Netarch( netObject );
    netarch.save();

    const architectureEmbed = new MessageEmbed()
      .setColor("DARK_PURPLE")
      .setTitle(`NET Architecture - ${rankInput.toUpperCase()}`)
      .addFields(
        {
          name: `${underscore("Name")}`,
          value: `${nameInput}`,
          inline: true,
        },
        {
          name: `${underscore("Access Point Key")}`,
          value: `${netID}`,
          inline: true,
        },
        {
          name: `${underscore("Lobby")}`,
          value: `${lobby[0]} ${lobby[1]}`,
          inline: false,
        },
        {
          name: `${underscore("Floors")}`,
          value: `${floors[0]} ${floors[1]} ${floors[2]} ${floors[3]} ${floors[4]} ${floors[5]} ${floors[6]}`,
          inline: false,
        }
      );

    await interaction.reply({ embeds: [architectureEmbed] });
  },
};
