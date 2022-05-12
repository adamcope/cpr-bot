const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const lib = require("../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription("Create a new character or update an existing character.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a character (limit 1 per User).")
        .addStringOption((option) =>
          option
            .setName("stats")
            .setDescription("Enter the value of the stats in this order seperated by spaces: INT REF DEX TECH COOL WILL LUCK MOVE BODY EMP.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("role")
            .setDescription("The character's role.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("update")
        .setDescription("Update a character: stats or skills")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Choose a Melee Weapon Type")
            .addChoice("Medium Melee Weapon", "Medium Melee Weapon")
            .addChoice("Heavy Melee Weapon", "Heavy Melee Weapon")
            .addChoice("Very Heavy Melee Weapon", "Very Heavy Melee Weapon")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ammo")
        .setDescription("Equip ammo.")
        .addStringOption((option) =>
          option
            .setName("class")
            .setDescription("Choose the ammo class.")
            .addChoice("M pistol", "M pistol")
            .addChoice("H pistol", "H pistol")
            .addChoice("VH pistol", "VH pistol")
            .addChoice("Slug", "Slug")
            .addChoice("Shell", "Shell")
            .addChoice("Rifle", "Rifle")
            .addChoice("Arrow", "Arrow")
            .addChoice("Grenade", "Grenade")
            .addChoice("Rocket", "Rocket")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Choose ammo type")
            .addChoice("Armor Piercing", "Armor Piercing")
            .addChoice("Basic", "Basic")
            .addChoice("Biotoxin", "Biotoxin")
            .addChoice("EMP", "EMP")
            .addChoice("Expansive", "Expansive")
            .addChoice("Flashbang", "Flashbang")
            .addChoice("Incendiary", "Incendiary")
            .addChoice("Poison", "Poison")
            .addChoice("Rubber", "Rubber")
            .addChoice("Sleep", "Sleep")
            .addChoice("Smoke", "Smoke")
            .addChoice("Teargas", "Teargas")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const pc = await Character.findOne({
        userID: `${interaction.member.id}`,
      });

      const weaponInput = interaction.options.getString("weapon");
      const ammoClass = interaction.options.getString("class");
      const ammoType = interaction.options.getString("type");

      const objectToEquip = () => {
        if (interaction.options.getSubcommand() == "ranged-weapon") {
          const rw = lib.rangedWeapons.find((x) => x.name == weaponInput);
          return rw;
        }
        if (interaction.options.getSubcommand() == "melee-weapon") {
          const mw = lib.meleeWeapons.find((x) => x.name == weaponInput);
          return mw;
        }
        if (interaction.options.getSubcommand() == "ammo") {
          const ammo = lib.ammo.find(
            (x) => x.name == `${ammoType} ${ammoClass}`
          );
          return ammo;
        }
      };
      interaction.reply("Equipped!")
      console.log(objectToEquip());
    } catch (error) {}
  },
};
