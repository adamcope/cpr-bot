# RED bot
A discord bot for playing Cyberpunk R E D 

## Development Diary

This project started as means for me to learn Javascript and Discord.js. I'm fully aware that it is a mess, but the parts that work, work, and the parts that don't will be worked on until they do. This a solo, newbie programmer's work, but if all goes well, it will be a useful tool for running Cyberpunk RED games in Discord.

What I would like to do is:
- create a means of uploading character data to a database
- render most of the combat mechanics
- make a few tools for randomly generating NET Architecture
- make commands for displaying references to NET Programs (blackICE, non-blackICE, etc)

We'll see how useful that is to use as a tool before continuing on to goals that require more complexity to work.<br><br>

## Commands To Do:

- [ ] ``/throw`` - weapons and grenades
- [ ] ``/grapple`` 
- [ ] ``/choke`` 
- [ ] ``/martial-arts``  - should be divided into subcommands for each Martial Art
- [ ] ``/cover``
  - [ ] ``enter``
  - [ ] ``leave``
- [x] ``status`` 
- [x] ``/equip`` 
- [x] ``/dmg``  - calculate dmg after sp/cover modifiers (currently only modifies hp directly)
- [x] ``/ablate`` - modifies armor SP, but will eventually be incorporated into the dmg command
- [x] ``/black-ice`` 
- [x] ``/non-black-ice``
- [x] ``/initiative``
- [x] ``/evasion``
- [x] ``/ranged-attack``
- [x] ``/archery``
- [x] ``/melee-weapon-attack``
- [x] ``/unarmed-melee-attack``
- [x] ``/rest``
- [x] ``/stabilize``
- [ ] ``/treatment``

### Notes
- ``/dmg`` command will eventually be outmoded and combined into attack commands, and before that will incorporate the ``/ablate`` command.

