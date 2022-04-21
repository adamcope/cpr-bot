const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const lib = require("../../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-melee-weapon")
    .setDescription("Add a weapon to your Inventory.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Weapon Type")
        .addChoice("Medium Melee Weapon", "medium_melee_weapon")
        .addChoice("Heavy Melee Weapon", "heavy_melee_weapon")
        .addChoice("Very Heavy Melee Weapon", "very_heavy_melee_weapon")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the weapon.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("desc")
        .setDescription("Add a description of the weapon. (optional)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const pc = await Character.findOne({
      userID: `${interaction.member.id}`,
    });

    const typeInput = interaction.options.getString("type");

    const nameInput = interaction.options.getString("name");

    const weapon = lib.meleeWeapons.find((x) => x.ref == typeInput);

    weapon.name = nameInput;

    pc.weapons.push(weapon);
    await pc.save();
    interaction.reply(
      `Added ${bold(weapon.name)} [${italic(
        weapon.ref.split("_").join(" ").toUpperCase()
      )}] to your inventory`
    );
  },
};
