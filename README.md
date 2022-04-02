## Slash Commands

### Information Commands

- ``/status`` - Displays __Character__ status:

|              |                   |                   |
| ------------ | ----------------- | ----------------- |
| HP           | Critical Injuries | Seriously Wounded |
| EMP          | LUCK              | Humanity          |
| Weapon Drawn | Ammo              | Ammo Type         |
| Armor        | SP                |                   |

- ``/weapons`` - Displays all weapons contained in character inventory. (visible to player only)
- ``/ammo`` - Displays the ammo types and amts. (visible to player only)
- ``/loadout`` - Displays _Weapons_, _Ammo_, and _Armor_. (visible to player only)
- ``/sheet`` - Displays _Character Sheet_. (visible to player only)

### Gameplay Commands

- ``/initiative`` - Rolls inititative check.
- ``/skillcheck`` ``<skill>`` - Rolls skillcheck.
- ``/evade`` - Rolls evasion check.

### Combat Commands
#### Ranged Attacks
- ``/draw <weapon>`` - Draw weapon.
- ``/shoot <distance>`` - Shoot drawn weapon.
- ``/aim <location>`` - Aim at _Head_, _Leg_, or _Hand_.
- ``/load <ammo type>`` - Load ammo into drawn weapon.
- ``/reload`` - Reload the same ammo that was previously loaded into weapon if available.
- ``/holster`` - Holster currently drawn weapon.
- ``/throw <object>`` - Throw _melee weapon_ or _grenade_.

#### Melee Attacks
- ``/melee <weapon>``

#### Combat Actions
- ``/grapple``

### Netrunning Commands

- ``/net-action <action>``
- ``/cyberdeck``
- ``/zap``
- ``/activate <program>``