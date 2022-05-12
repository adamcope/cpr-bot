const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const lib = require("../../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload a currently equipped weapon.")
    .addStringOption((option) =>
      option
        .setName("weapon")
        .setDescription("Choose weapon to reload. (Must be equipped)")
        .addChoice("Medium Pistol", "Medium Pistol")
        .addChoice("Heavy Pistol", "Heavy Pistol")
        .addChoice("Very Heavy Pistol", "Very Heavy Pistol")
        .addChoice("SMG", "SMG")
        .addChoice("Heavy SMG", "Heavy SMG")
        .addChoice("Shotgun", "Shotgun")
        .addChoice("Assault Rifle", "Assault Rifle")
        .addChoice("Sniper Rifle", "Sniper Rifle")
        .addChoice("Grenade Launcher", "Grenade Launcher")
        .addChoice("Rocket Launcher", "Rocket Launcher")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const pc = await Character.findOne({
        userID: `${interaction.member.id}`,
      });

      const weaponInput = interaction.options.getString("weapon");

      const weaponToReload = pc.weapons.find((x) => x.name == weaponInput);
      const weaponIndex = pc.weapons.findIndex((x) => x.name == weaponInput);

      if (!weaponToReload) {
        interaction.reply("Weapon not equipped");
      }

      if (weaponToReload) {
        const amountToRemove = () => {
          const ammoRemaining = pc.weapons[weaponIndex].ammo;
          if (ammoRemaining == 0) {
            return pc.weapons[weaponIndex].standardMag;
          } else {
            return pc.weapons[weaponIndex].standardMag - ammoRemaining;
          }
        };
        const ammoTypeIndex = pc.ammo.findIndex(
          (x) => (x.name == weaponToReload.ammoLoaded)
        );
        const newAmmoAmount = pc.ammo[ammoTypeIndex].amount - amountToRemove();

        pc.ammo[ammoTypeIndex].amount = newAmmoAmount;
        pc.weapons[weaponIndex].ammo = pc.weapons[weaponIndex].standardMag;
        await pc.save();
      }

      interaction.reply("Reloaded.");
    } catch (error) {console.log(error)}
  },
};
