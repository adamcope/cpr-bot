const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("create-character")
    .setDescription("Create a new character. (DISABLED)")
    .setDefaultPermission(false)
    .addStringOption((option) => 
        option
        .setName("name")
        .setDescription("Character's name.")
        .setRequired(true)
        )
    .addStringOption((option) => option
    .setName("role")
    .setDescription("Character's role.")
    .setRequired(true)
    )
    .addStringOption((option) => option
    .setName("stats")
    .setDescription("Enter stat values in the following order: 'INT/REF/DEX/TECH/COOL/WILL/LUCK/MOVE/BODY/EMP'")
    .setRequired(true)
    ),

    async execute(interaction) {
        
        const userID = interaction.member.id
        const username = interaction.member.user
        const pcName = interaction.options.getString("name")
        const pcRole = interaction.options.getString("role")
        const pcStats = interaction.options.getString("stats").split("/")
        
        
        
        interaction.reply(`${bold("User")} ${username} ${bold("ID")} ${userID}\n${bold("Name")} ${pcName} ${bold("Role")} ${pcRole}\n${bold("INT")} ${pcStats[0]} ${bold("REF")} ${pcStats[1]} ${bold("DEX")} ${pcStats[2]} ${bold("TECH")} ${pcStats[3]} ${bold("COOL")} ${pcStats[4]}\n${bold("WILL")} ${pcStats[5]} ${bold("LUCK")} ${pcStats[6]} ${bold("MOVE")} ${pcStats[7]} ${bold("BODY")} ${pcStats[8]} ${bold("EMP")} ${pcStats[9]}`)
    }
}