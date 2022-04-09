const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const { bold, underscore, italic } = require("@discordjs/builders");
const genArch = require("../../modules/netArchitecture.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("generate-net")
    .setDescription("Randomly generate NET architecture.")
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

        const floorInput = interaction.options.getInteger("floors")
        const rankInput = interaction.options.getString("rank")

        const netArray = genArch(floorInput, rankInput)
        const dress= `〈⍿[| |]⍿〉`

        const architectureEmbed = new MessageEmbed()
        .setColor("DARK_PURPLE")
        .setTitle(`NET Architecture - ${rankInput.toUpperCase()}`)
        .addFields(
            {name: `${underscore("Lobby")}`, value: `L1 ${netArray[0]}  \n L2 ${netArray[1]}`, inline:false},
            {name: `${underscore("Floors")}`, value: `F3 ${netArray[2]} \n F4 ${netArray[3]}\n F5 ${netArray[4]}`, inline:false}
        )
        
        console.log(netArray)
        await interaction.reply({ embeds: [architectureEmbed] })
    }
}
