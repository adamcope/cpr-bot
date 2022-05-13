const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const lib = require("../../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("load")
    .setDescription(
      "Load a currently equipped weapon with a different kind of ammo."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("m-pistol")
        .setDescription("Load a Medium Pistol or SMG with M Pistol ammo.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Medium Pistol", "Medium Pistol")
            .addChoice("SMG", "SMG")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .setDescription("Choose ammo type")
            .addChoice("Armor Piercing", "Armor Piercing M pistol")
            .addChoice("Basic", "Basic M pistol")
            .addChoice("Expansive", "Expansive M pistol")
            .addChoice("Rubber", "Rubber M pistol")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("h-pistol")
        .setDescription("Load a Heavy Pistol or Heavy SMG with H Pistol ammo.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Heavy Pistol", "Heavy Pistol")
            .addChoice("Heavy SMG", "Heavy SMG")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .setDescription("Ammo type to load.")
            .addChoice("Armor Piercing", "Armor Piercing H pistol")
            .addChoice("Basic", "Basic H pistol")
            .addChoice("Expansive", "Expansive H pistol")
            .addChoice("Rubber", "Rubber H pistol")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("vh-pistol")
        .setDescription("Load a Very Heavy Pistol with VH Pistol ammo.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Very Heavy Pistol", "Very Heavy Pistol")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .addChoice("Armor Piercing", "Armor Piercing VH pistol")
            .addChoice("Basic", "Basic VH pistol")
            .addChoice("Expansive", "Expansive VH pistol")
            .addChoice("Rubber", "Rubber VH pistol")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("shell-slug")
        .setDescription("Load a Shotgun with Shells or Slugs ammo.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Shotgun", "Shotgun")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .addChoice("Armor Piercing", "Armor Piercing VH pistol")
            .addChoice("Basic Slug", "Basic Slug")
            .addChoice("Expansive", "Expansive Slug")
            .addChoice("Rubber", "Rubber Slug")
            .addChoice("Basic Shell", "Basic Shell")
            .addChoice("Incendiary Shell", "Incendiary Shell")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("rifle")
        .setDescription(
          "Load an Assault Rifle or Sniper Rifle with Rifle ammo."
        )
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Assault Rifle", "Assault Rifle")
            .addChoice("Sniper Rifle", "Sniper Rifle")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .addChoice("Armor Piercing", "Armor Piercing")
            .addChoice("Basic", "Basic")
            .addChoice("Expansive", "Expansive")
            .addChoice("Rubber", "Rubber")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("grenade")
        .setDescription("Load a Grenade Launcher with grenades.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Grenade Launcher", "Grenade Launcher")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .setDescription("Choose ammo type")
            .addChoice("Armor Piercing", "Armor Piercing Grenade")
            .addChoice("Basic", "Basic Grenade")
            .addChoice("Biotoxin", "Biotoxin Grenade")
            .addChoice("EMP", "EMP Grenade")
            .addChoice("Expansive", "Expansive Grenade")
            .addChoice("Flashbang", "Flashbang Grenade")
            .addChoice("Incendiary", "Incendiary Grenade")
            .addChoice("Poison", "Poison Grenade")
            .addChoice("Rubber", "Rubber Grenade")
            .addChoice("Sleep", "Sleep Grenade")
            .addChoice("Smoke", "Smoke Grenade")
            .addChoice("Teargas", "Teargas Grenade")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("rocket")
        .setDescription("Load a Rocket Launcher with rockets.")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Weapon to load.")
            .addChoice("Rocket Launcher", "Rocket Launcher")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("ammo-type")
            .addChoice("Armor Piercing", "Armor Piercing Rocket")
            .setDescription("Ammo type to load.")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const pc = await Character.findOne({
        userID: `${interaction.member.id}`,
      });

      const weaponInput = interaction.options.getString("weapon");
      const ammoInput = interaction.options.getString("ammo-type");

      const weaponToReload = pc.weapons.find((x) => x.name == weaponInput);
      const weaponIndex = pc.weapons.findIndex((x) => x.name == weaponInput);

      const returnedAmmoIndex = pc.ammo.findIndex(
        (x) => x.name == weaponToReload.ammoLoaded
      );

      const ammoToLoad = pc.ammo.find((x) => x.name == ammoInput);
      const ammoToLoadIndex = pc.ammo.findIndex((x) => x.name == ammoInput);

      if (!weaponToReload) {
        interaction.reply("Weapon not equipped");
      }

      if (!ammoToLoad) {
        interaction.reply("Ammo cannot be found in inventory.");
      }

      if (weaponToReload && ammoToLoad) {

        //?? Fix negative ammo bug

        //** returns ammo loaded in weapon to ammo inventory */
        pc.ammo[returnedAmmoIndex].amount = pc.weapons[weaponIndex].ammo + pc.ammo[returnedAmmoIndex].amount;

        //** removes an amount of ammo from ammo inventory and loads into weapon*/
        pc.ammo[ammoToLoadIndex].amount = pc.ammo[ammoToLoadIndex].amount - weaponToReload.standardMag;
        pc.weapons[weaponIndex].ammo = pc.weapons[weaponIndex].standardMag;

        //** changes the name of the ammo loaded to the ammo input in the command */
        pc.weapons[weaponIndex].ammoLoaded = ammoInput

        //!! Negative ammo Bandaid
        if(pc.ammo[ammoToLoadIndex] < 0) {
          pc.ammo[ammoToLoadIndex] = 0
        }

        if (pc.weapons[weaponIndex] < 0) {
          pc.weapons[weaponIndex] = 0
        }

        await pc.save();
        interaction.reply("Loaded!");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
