import { RegexDic } from '../dictionaryHelper'

/**
 * @link https://minecraft-ja.gamepedia.com/%E4%BD%93%E5%8A%9B#.E6.AD.BB.E4.BA.A1.E3.83.A1.E3.83.83.E3.82.BB.E3.83.BC.E3.82.B8
 * @link https://minecraft.gamepedia.com/Death_messages
 */
const death: RegexDic = {
  // Arrows
  arrows: {
    pattern: /^(.*) was shot by Arrow$/,
    ja: (message, player) => `${player} は 矢 に射抜かれた`,
  },
  arrows2: {
    pattern: /^(.*) was shot by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に射抜かれた`,
  },
  arrows3: {
    pattern: /^(.*) was shot by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で射抜かれた`,
  },

  // Cactus
  cactus: {
    pattern: /^(.*) was pricked to death$/,
    ja: (message, player) => `${player} はサボテンが刺さって死んだ`,
  },
  cactus2: {
    pattern: /^(.*) walked into a cactus whilst trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃げようとしてサボテンにぶつかった`,
  },

  // Dragon breath
  dragonBreath: {
    pattern: /^(.*) was roasted in dragon breath$/,
    ja: (message, player) => `${player} はドラゴンの息で炙り焼きにされた`,
  },
  dragonBreath2: {
    pattern: /^(.*) was roasted in dragon breath by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} のドラゴンの息で炙り焼きにされた`,
  },

  // Drowning
  drowning: {
    pattern: /^(.*) drowned$/,
    ja: (message, player) => `${player} は溺れ死んだ`,
  },
  drowning2: {
    pattern: /^(.*) drowned whilst trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃れようとして溺れ死んだ`,
  },

  // Elytra
  elytra: {
    pattern: /^(.*) removed an elytra while flying$/,
    ja: (message, player) => `${player} は運動エネルギーを体験した`,
  },
  elytra2: {
    pattern: /^(.*) experienced kinetic energy whilst trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃れようとして運動エネルギーを体験した`,
  },

  // Explosions
  explosions: {
    pattern: /^(.*) blew up$/,
    ja: (message, player) => `${player} は爆発に巻き込まれた`,
  },
  explosions2: {
    pattern: /^(.*) was blown up by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に爆破された`,
  },
  explosions3: {
    pattern: /^(.*) was blown up by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で爆破された`,
  },

  // Falling
  falling: {
    pattern: /^(.*) hit the ground too hard$/,
    ja: (message, player) => `${player} は地面と強く激突した`,
  },
  falling2: {
    pattern: /^(.*) hit the ground too hard whilst trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃れようとして地面に強く激突した`,
  },
  falling3: {
    pattern: /^(.*) fell from a high place$/,
    ja: (message, player) => `${player} は高い所から落ちた`,
  },
  falling4: {
    pattern: /^(.*) fell off a ladder$/,
    ja: (message, player) => `${player} ははしごから落ちた`,
  },
  falling5: {
    pattern: /^(.*) fell off some vines$/,
    ja: (message, player) => `${player} はツタから滑り落ちた`,
  },
  falling6: {
    pattern: /^(.*) fell off some weeping vines‌$/,
    ja: (message, player) => `${player} は枝垂れツタから滑り落ちた`,
  },
  falling7: {
    pattern: /^(.*) fell off some twisting vines‌$/,
    ja: (message, player) => `${player} はねじれツタから滑り落ちた`,
  },
  falling8: {
    pattern: /^(.*) fell off a scaffolding‌$/,
    ja: (message, player) => `${player} は足場から落ちた`,
  },
  falling9: {
    pattern: /^(.*) fell while climbing‌$/,
    ja: (message, player) => `${player} は登る途中で落ちた`,
  },
  fellOut10: {
    pattern: /^(.*) fell out of the water$/,
    ja: (message, player) => `${player} は水から落ちた`,
  },
  fellOut11: {
    pattern: /^(.*) was doomed to fall$/,
    ja: (message, player) => `${player} は落ちる運命だった`,
  },
  fellOut12: {
    pattern: /^(.*) was doomed to fall by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に落とされる運命だった`,
  },
  fellOut13: {
    pattern: /^(.*) was doomed to fall by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で落とされる運命だった`,
  },

  // Falling blocks
  fallingBlocks: {
    pattern: /^(.*) was squashed by a falling anvil$/,
    ja: (message, player) => `${player} は落下してきた金床に押しつぶされた`,
  },
  fallingBlocks2: {
    pattern: /^(.*) was squashed by a falling anvil whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら落ちてきた金床に押しつぶされた`,
  },
  fallingBlocks3: {
    pattern: /^(.*) was squashed by a falling block$/,
    ja: (message, player) => `${player} は落下してきたブロックに押しつぶされた`,
  },
  fallingBlocks4: {
    pattern: /^(.*) was squashed by a falling block whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら落ちてきたブロックに押しつぶされた`,
  },

  // Fire
  fire: {
    pattern: /^(.*) went up in flames$/,
    ja: (message, player) => `${player} は炎に巻かれた`,
  },
  fire2: {
    pattern: /^(.*) burned to death$/,
    ja: (message, player) => `${player} はこんがりと焼けた`,
  },
  fire3: {
    pattern: /^(.*) was burnt to a crisp whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながらカリカリに焼けた`,
  },
  fire4: {
    pattern: /^(.*) walked into a fire whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら火の中へ踏み入った`,
  },

  // Firework rockets
  fireworkRockets: {
    pattern: /^(.*) went off with a bang$/,
    ja: (message, player) => `${player} は花火の爆発に巻き込まれた`,
  },
  fireworkRockets2: {
    pattern: /^(.*)  went off with a bang whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら花火の爆発に巻き込まれた`,
  },

  // Lava
  lava: {
    pattern: /^(.*) tried to swim in lava$/,
    ja: (message, player) => `${player} は溶岩遊泳を試みた`,
  },
  lava2: {
    pattern: /^(.*) tried to swim in lava while trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃れようと溶岩遊泳を試みた`,
  },

  // Lightning
  lightning: {
    pattern: /^(.*) was struck by lightning$/,
    ja: (message, player) => `${player} は雷に打たれた`,
  },
  lightning2: {
    pattern: /^(.*) was struck by lightning whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら雷に打たれた`,
  },

  // Magma Block
  magmaBlock: {
    pattern: /^(.*) discovered the floor was lava$/,
    ja: (message, player) => `${player} は床が溶岩だったと気付いた`,
  },
  magmaBlock2: {
    pattern: /^(.*) walked into danger zone due to (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に妨害されて危険地帯に足を踏み入れた`,
  },

  // Magic
  magic: {
    pattern: /^(.*) was killed by magic$/,
    ja: (message, player) => `${player} は魔法で殺された`,
  },
  magic2: {
    pattern: /^(.*) was killed by (.*) using magic$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} の魔法で殺された`,
  },

  // Players and mobs
  playersOrMobs: {
    pattern: /^(.*) was slain by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に殺害された。`,
  },
  playersOrMobs2: {
    pattern: /^(.*) was slain by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で殺害された`,
  },
  playersOrMobs3: {
    pattern: /^(.*) was fireballed by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に火だるまにされた。`,
  },
  playersOrMobs4: {
    pattern: /^(.*) was fireballed by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で火だるまにされた`,
  },
  playersOrMobs5: {
    pattern: /^(.*) was stung to death$/,
    ja: (message, player) => `${player} は刺されて死んだ`,
  },
  playersOrMobs6: {
    pattern: /^(.*) was pummeled by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} によってぺしゃんこにされた`,
  },
  playersOrMobs7: {
    pattern: /^(.*) was pummeled by (.*) using (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} でぺしゃんこにされた`,
  },

  // Starving
  starving: {
    pattern: /^(.*) starved to death$/,
    ja: (message, player) => `${player} は飢え死にした`,
  },
  starving2: {
    pattern: /^(.*) starved to death whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら飢え死にした`,
  },

  // Suffocation
  suffocated: {
    pattern: /^(.*) suffocated in a wall$/,
    ja: (message, player) => `${player} は壁の中で窒息した`,
  },
  suffocated2: {
    pattern: /^(.*) suffocated in a wall whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら壁の中で窒息した`,
  },
  suffocated3: {
    pattern: /^(.*) was squished too much$/,
    ja: (message, player) => `${player} は押しつぶされた`,
  },
  suffocated4: {
    pattern: /^(.*) was squashed by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} に押しつぶされた`,
  },

  // Sweet Berry Bushes
  sweetBerryBushes: {
    pattern: /^(.*) was poked to death by a sweet berry bush$/,
    ja: (message, player) => `${player} はスイートベリーの棘が刺さって死んだ`,
  },
  sweetBerryBushes2: {
    pattern: /^(.*) was poked to death by a sweet berry bush whilst trying to escape (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} から逃げようとしてスイートベリーの棘が刺さって死んだ`,
  },

  // Thorns enchantment
  thornsEnchantment: {
    pattern: /^(.*) was killed trying to hurt (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} を傷つけようとして殺された`,
  },
  thornsEnchantment2: {
    pattern: /^(.*) was killed by (.*) trying to hurt (.*)$/,
    ja: (message, player, item, playerOrMob) =>
      `${player} は ${playerOrMob} を傷つけようとして ${item} に殺された`,
  },

  // Trident
  trident: {
    pattern: /^(.*) was impaled by Trident$/,
    ja: (message, player) => `${player} は トライデント によって突き抜かれた`,
  },
  trident2: {
    pattern: /^(.*) was impaled by (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} によって突き抜かれた`,
  },
  trident3: {
    pattern: /^(.*) was impaled by (.*) with (.*)$/,
    ja: (message, player, playerOrMob, item) =>
      `${player} は ${playerOrMob} の ${item} で突き抜かれた`,
  },

  // Void
  void: {
    pattern: /^(.*) fell out of the world$/,
    ja: (message, player) => `${player} は奈落の底へ落ちた`,
  },
  void2: {
    pattern: /^(.*) didn't want to live in the same world as (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と同じワールドに住みたくなかった`,
  },

  // Wither effect
  witherEffect: {
    pattern: /^(.*) withered away$/,
    ja: (message, player) => `${player} は干からびた`,
  },
  witherEffect2: {
    pattern: /^(.*) withered away whilst fighting (.*)$/,
    ja: (message, player, playerOrMob) =>
      `${player} は ${playerOrMob} と戦いながら干からびた`,
  },

  // Died
  died: {
    pattern: /^(.*) died$/,
    ja: (message, player) => `${player} は死んだ`,
  },
  died2: {
    pattern: /^(.*) died because of (.*)$/,
    ja: (message, player, object) => `${player} が ${object} によって死んだ`,
  },

  // Other
  other: {
    pattern: /^(.*) was slain by Small Fireball$/,
    ja: (message, player) => `${player}は 小さな火の玉 に殺害された`,
  },
}

export default death
