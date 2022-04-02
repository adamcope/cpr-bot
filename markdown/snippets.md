# Snippets

## Common Import Block

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, italic, underscore } = require("@discordjs/builders");
const distanceToRange = require("../../mechanics/distanceToRange.js");
const isHit = require("../../mechanics/isHit.js");
const thumbGIFurl = require("../../mechanics/thumbGIFurl.js");
```

## Markdown Import

```js
const {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
} = require("@discordjs/builders");
```

## Slash Command Builder (w/ imports)

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const mongoose = require("mongoose");
const Character = require("../../models/playerCharacter.js");
const { MessageEmbed } = require("discord.js");
const { bold, italic, underscore } = require("@discordjs/builders");
const thumbGIFurl = require("../../mechanics/thumbGIFurl.js");

module.exports = {
  data: new SlashCommandBuilder().setName("").setDescription("")
  .addStringOption((option) =>
      option
        .setName("commandOption")
        .setDescription("")
        .setRequired(true)
    ),
  async execute(interaction) {
    let char = await Character.findOne({
      userID: `${interaction.member.id}`,
    }).lean();

    let input = interaction.options.getString("commandOption")

    let charName = char.characterName;
    let thumbnail = char.characterImgUrl;
    let username = char.username;
  },
};
```
## SubCommand

```js
.addSubcommand(subcommand =>
		subcommand
			.setName('')
			.setDescription('')
			.addUserOption(option => option.setName('').setDescription('')))
```

## Load Character (Mongoose)

```js
let char = await Character.findOne({
  userID: `${interaction.member.id}`,
}).lean();

let charName = char.characterName;
let thumbnail = char.characterImgUrl;
let username = char.username;
```

## Quiver

```javascript
let ammo = () => {
  if (weapons[index].ref == "bow" || weapons[index].ref == "crossbow") {
    ammo = char.ammo[ammoIndex].amt;
  } else {
    ammo = char.weapons[index].ammo;
  }
};
```

## Embed Builder

```js
const Embed = new MessageEmbed()
      .setColor("#7a1212")
      .setTitle(``)
      .setDescription(``);
      .addFields({
          name: `${underscore("")}`,
          value: ``,
        })
```

## Call Embed
```js
await interaction.reply({ embeds: [Embed], ephemeral: false })
```