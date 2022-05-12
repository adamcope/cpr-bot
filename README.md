# RED bot
A discord bot for playing Cyberpunk R E D 

## Development Diary

This project started as means for me to learn Javascript and Discord.js. I'm fully aware that it is a mess, but the parts that work, work, and the parts that don't will be worked on until they do. This a solo, newbie programmer's work, but if all goes well, it will be a useful tool for running Cyberpunk RED games in Discord.

The more I work on this bot, the more I think that to get the most out of it, and make the process of GMing with it much more smooth, a connected web app that serves as a GM screen would be nice, as just using slash commands on discord for all the features it would need to be a really nice tool (such as character resource tracking, and netrunning management). At some point I will have to make a decision as to whether I begin developing this complimentary web app, or designing the slash commands to instead rely on inputs and not track as much character data.<br><br>

`` !! BEGINNING OF OPINION !! ``<br><br>
For what it's worth, in making this bot I have learned a great deal about javascript, node, and Discord.js, which was the whole point, and really that's enough for me. Originally I only intended to take some mechanics that were a pain to reference using the manual and a dice rolling bot, some stat blocks and effects that were scattered throughout the manual, and integrate them in a simple Discord bot of my own making for mine and my friend's game. Since embarking on this project I have also learned a lot about the mechanics and design of R. Talsorian's Cyberpunk RED TTRPG, and I am not without my criticisms. 

A complete and integrated rendering of the game's mechanics either in this bot, or the amazing Foundry VTT module (which I only admire, and have nothing to do with), isn't possible without homebrew, judgement calls on the part of the tool designers, or both.  This isn't so much a deal breaker for me or others, as the game as written contains enough to ignore the inconsistencies and problems, and play a fun TTRPG with friends.

The ambitiousness of this bot's design has grown in tandem with my discovery of the myriad mechanical intricacies to be found in the CPR core systems. I say systems because in no way does the game behave as a consistent or 'whole' system throughout its mechanics. Netrunning and the Tech class are obvious examples, but the Corpo class is its own head scratcher when it comes to rendering it into a Discord bot. Needless to say, this game is fairly rough around the edges.

As it stands currently with developing this bot, I'm in no way qualified to make a discord bot that serves as a complete rendering of CPR mechanics, and if you search on github you will see other attempts at making other tools that are smaller in scope, but have been abandoned. It's hard for me not to believe that the design of CPR itself is partly responsible for this.<br><br>
`` !! END OF OPINION !! ``<br><br>

What I would like to do is:
- create a means of uploading character data to a database
- render most of the combat mechanics
- make a few tools for randomly generating NET Architecture
- make commands for displaying references to NET Programs (blackICE, non-blackICE, etc)

We'll see how useful that is to use as a tool before continuing on to goals that require more complexity to work.<br><br>

## To Do:

- [x] Modify Crit Injury Embed so that when Target is 'Head" crit injury is rolled from Head Injury Table
- [x] Add Bonus DMG Field to Crit Injury Embed
- [ ] ``/throw`` command
- [ ] ``/grapple`` command
- [ ] ``/choke`` command
- [ ] ``/martial-arts`` command - should be divided into subcommands for each Martial Art
- [ ] ``/character`` command
  - [ ] ``create`` subcommand
  - [ ] ``update`` ``<skill> || <stat>`` subcommand
  - [x] ``status`` subcommand
- [x] ``/equip`` command !! PRIORITY
- [x] ``/dmg`` command - calculate dmg after sp/cover modifiers
- [x] ``/black-ice`` !! PRIORITY
- [x] ``/non-black-ice`` !! PRIORITY

## Working Commands
### Combat
- ``/initiative``
- ``/evasion``
- ``/ranged-attack``
- ``/archery``
- ``/melee-weapon-attack``
- ``/unarmed-melee-attack``
