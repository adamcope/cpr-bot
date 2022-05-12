const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const lib = require("../../modules/library.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("equip")
    .setDescription("Equip an item and add it to your Character data.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ranged-weapon")
        .setDescription("Equip a Ranged Weapon")
        .addStringOption((option) =>
          option
            .setName("weapon")
            .setDescription("Type of Ranged Weapon.")
            .addChoice("Medium Pistol", "Medium Pistol")
            .addChoice("Heavy Pistol", "Heavy Pistol")
            .addChoice("Very Heavy Pistol", "Very Heavy Pistol")
            .addChoice("SMG", "SMG")
            .addChoice("Heavy SMG", "Heavy SMG")
            .addChoice("Bow", "Bow")
            .addChoice("Crossbow", "Crossbow")
            .addChoice("Shotgun", "Shotgun")
            .addChoice("Assault Rifle", "Assault Rifle")
            .addChoice("Sniper Rifle", "Sniper Rifle")
            .addChoice("Grenade Launcher", "Grenade Launcher")
            .addChoice("Rocket Launcher", "Rocket Launcher")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("melee-weapon")
        .setDescription("Equip a Melee Weapon")
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
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Amount of ammo to add to your inventory.")
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

      const equipSubCommand = interaction.options.getSubcommand();

      const equip = async () => {
        if (equipSubCommand == "ranged-weapon") {
          const rw = lib.rangedWeapons.find((x) => x.name == weaponInput);
          if (pc.weapons.find((x) => x.ref == rw.ref)) {
            return;
          } else {
            pc.weapons.push(rw);
            await pc.save();
          }
          const equipEmbed = new MessageEmbed()
            .setColor("#7a1212")
            .setTitle(`${pc.characterName} - ${italic("Equip")}`)
            .setDescription(
              `Added ${bold(rw.name)} to your inventory`
            )
            .setThumbnail(`${pc.characterImgUrl}`)
            .setFooter({ text: `Player: @${pc.username}` });

          await interaction.reply({ embeds: [equipEmbed], ephemeral: true });
        }
        if (equipSubCommand == "melee-weapon") {
          const mw = lib.meleeWeapons.find((x) => x.name == weaponInput);
          if (pc.weapons.find((x) => x.ref == mw.ref)) {
            return;
          } else {
            pc.weapons.push(mw);
            await pc.save();
          }
          const equipEmbed = new MessageEmbed()
            .setColor("#7a1212")
            .setTitle(`${pc.characterName} - ${italic("Equip")}`)
            .setDescription(
              `Added ${bold(mw.name)} to your inventory`
            )
            .setThumbnail(`${pc.characterImgUrl}`)
            .setFooter({ text: `Player: @${pc.username}` });

          await interaction.reply({ embeds: [equipEmbed], ephemeral: true });
        }
        if (equipSubCommand == "ammo") {
          const ammo = lib.ammo.find(
            (x) => x.name == `${ammoType} ${ammoClass}`
          );
          const isAmmoAlreadyEquipped = pc.ammo.find(
            (x) => x.name == ammo.name
          );
          const equippedAmmoIndex = pc.ammo.findIndex(
            (x) => x.name == ammo.name
          );

          const newAmmoAmount = interaction.options.getInteger("amount");

          if (!isAmmoAlreadyEquipped) {
            pc.ammo.push(ammo);
            await pc.save();
            console.log(ammo);
          } else {
            pc.ammo[equippedAmmoIndex].amount = pc.ammo[equippedAmmoIndex].amount + newAmmoAmount;

            await pc.save();
            console.log(newAmmoAmount);
            console.log("Ammo count increased.");
          }
          const equipEmbed = new MessageEmbed()
            .setColor("#7a1212")
            .setTitle(`${pc.characterName} - ${italic("Equip")}`)
            .setDescription(
              `Added ${italic(newAmmoAmount)} ${bold(
                ammoType + " " + ammoClass
              )} to your inventory`
            )
            .setThumbnail(`${pc.characterImgUrl}`)
            .setFooter({ text: `Player: @${pc.username}` });

          await interaction.reply({ embeds: [equipEmbed], ephemeral: true });
        }
      };

      equip();
    } catch (error) {
      console.log(error);
    }
  },
};
