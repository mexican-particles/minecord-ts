import { RegexRepDic } from './types'

export const deathRegexRepDicJa: RegexRepDic = {
  arrows: [
    /^(.*) was shot by arrow$/,
    (message, player) => `${player} が矢で射抜かれて逝ったみたい。`,
  ],
  arrows2: [
    /^(.*) was shot by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に射抜かれて逝ったみたい。`,
  ],
  arrows3: [
    /^(.*) was shot by (.*) using (.*)$/,
    (message, player, playerOrMob, bowName) =>
      `${player} が ${playerOrMob} の ${bowName} に射抜かれて逝ったみたい。`,
  ],
  cactus: [
    /^(.*) was pricked to death$/,
    (message, player) => `${player} が刺されて逝ったみたい。`,
  ],
  cactus2: [
    /^(.*) hugged a cactus$/,
    (message, player) => `${player} がサボテンを抱きしめて逝ったみたい。`,
  ],
  cactus3: [
    /^(.*) walked into a cactus while trying to escape (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} から逃げようとして、サボテンに触って逝ったみたい。`,
  ],
  stabbed: [
    /^(.*) was stabbed to death$/,
    (message, player) => `${player} が刺されて逝ったみたい。`,
  ],
  drowned: [
    /^(.*) drowned$/,
    (message, player) => `${player} が溺れて逝ったみたい。`,
  ],
  drowned2: [
    /^(.*) drowned whilst trying to escape (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} から逃げようとして、溺れて逝ったみたい。`,
  ],
  suffocated: [
    /^(.*) suffocated in a wall$/,
    (message, player) => `${player} が壁の中で窒息して逝ったみたい。`,
  ],
  squished: [
    /^(.*) was squished too much$/,
    (message, player) => `${player} が激しく押し潰されて逝ったみたい。`,
  ],
  kinetic: [
    /^(.*) experienced kinetic energy$/,
    (message, player) =>
      `${player} が有り余る運動エネルギーを体験して逝ったみたい。`,
  ],
  elytra: [
    /^(.*) removed an elytra while flying$/,
    (message, player) => `${player} が飛行中にエリトラが壊れて逝ったみたい。`,
  ],
  blewUp: [
    /^(.*) blew up$/,
    (message, player) => `${player} が爆裂して逝ったみたい。`,
  ],
  blownUp: [
    /^(.*) was blown up by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に爆破されて逝ったみたい。`,
  ],
  killed: [
    /^(.*) was killed by (.*)$/,
    (message, player, object) =>
      `${player} が ${object} にやられて逝ったみたい。`,
  ],
  ground: [
    /^(.*) hit the ground too hard$/,
    (message, player) => `${player} が地面と激突して逝ったみたい。`,
  ],
  fell: [
    /^(.*) fell from a high place$/,
    (message, player) => `${player} が高いところから落ちて逝ったみたい。`,
  ],
  fellOut: [
    /^(.*) fell off a ladder$/,
    (message, player) => `${player} がはしごから落ちて逝ったみたい。`,
  ],
  fellOut2: [
    /^(.*) fell off some vines$/,
    (message, player) => `${player} がツタから滑り落ちて逝ったみたい。`,
  ],
  fellOut3: [
    /^(.*) fell out of the water$/,
    (message, player) => `${player} が水から落ちて逝ったみたい。`,
  ],
  fellInto: [
    /^(.*) fell into a patch of fire$/,
    (message, player) => `${player} が火の海に落ちて逝ったみたい。`,
  ],
  fellInto2: [
    /^(.*) fell into a patch of cacti$/,
    (message, player) => `${player} がサボテンの上に落ちて逝ったみたい。`,
  ],
  fall: [
    /^(.*) was doomed to fall by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に落とされ逝ったみたい。`,
  ],
  shotOff: [
    /^(.*) was shot off some vines by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} にツタから撃墜され逝ったみたい。`,
  ],
  shotOff2: [
    /^(.*) was shot off a ladder by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} にはしごから撃墜され逝ったみたい。`,
  ],
  blown: [
    /^(.*) was blown from a high place by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に高いところから吹き飛ばされ逝ったみたい。`,
  ],
  squashed: [
    /^(.*) was squashed by a falling anvil$/,
    (message, player) =>
      `${player} が落下してきた金床に押し潰されて逝ったみたい。`,
  ],
  squashed2: [
    /^(.*) was squashed by a falling block$/,
    (message, player) =>
      `${player} が落下してきたブロックに押し潰されて逝ったみたい。`,
  ],
  flames: [
    /^(.*) went up in flames$/,
    (message, player) => `${player} が炎に巻かれて逝ったみたい。`,
  ],
  burned: [
    /^(.*) burned to death$/,
    (message, player) => `${player} がこんがりと焼けて逝ったみたい。`,
  ],
  burnt: [
    /^(.*) was burnt to a crisp whilst fighting (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} と戦いながら、カリカリに焼けて逝ったみたい。`,
  ],
  fire: [
    /^(.*) walked into a fire whilst fighting (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} と戦いながら、炎の中に踏み入って逝ったみたい。`,
  ],
  wentOff: [
    /^(.*) went off with a bang$/,
    (message, player) => `${player} がドカンと儚く逝ったみたい。`,
  ],
  lava: [
    /^(.*) tried to swim in lava$/,
    (message, player) => `${player} が溶岩を遊泳して逝ったみたい。`,
  ],
  lava2: [
    /^(.*) tried to swim in lava while trying to escape (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} から逃げようとして、溶岩を遊泳して逝ったみたい。`,
  ],
  lightning: [
    /^(.*) was struck by lightning$/,
    (message, player) => `${player} が雷に打たれて逝ったみたい。`,
  ],
  lava3: [
    /^(.*) discovered floor was lava$/,
    (message, player) => `${player} が溶岩を踏んで逝ったみたい。`,
  ],
  slain: [
    /^(.*) was slain by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} にやられて逝ったみたい。`,
  ],
  slain2: [
    /^(.*) was slain by (.*) using (.*)$/,
    (message, player, playerOrMob, weapon) =>
      `${player} が ${playerOrMob} の ${weapon} にやられて逝ったみたい。`,
  ],
  finished: [
    /^(.*) got finished off by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} の手によって逝ったみたい。`,
  ],
  finished2: [
    /^(.*) got finished off by (.*) using (.*)$/,
    (message, player, playerOrMob, weapon) =>
      `${player} が ${playerOrMob} の ${weapon} によって逝ったみたい。`,
  ],
  fireballed: [
    /^(.*) was fireballed by (.*)$/,
    (message, player, mob) =>
      `${player} が ${mob} に火だるまにされて逝ったみたい。`,
  ],
  magic: [
    /^(.*) was killed by magic$/,
    (message, player) => `${player} が魔法を食らって逝ったみたい。`,
  ],
  magic2: [
    /^(.*) was killed by (.*) using magic$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} から魔法を食らって逝ったみたい。`,
  ],
  starved: [
    /^(.*) starved to death$/,
    (message, player) => `${player} が飢えに飢えて逝ったみたい。`,
  ],
  killed2: [
    /^(.*) was killed while trying to hurt (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に返り討ちにされて逝ったみたい。`,
  ],
  impaled: [
    /^(.*) was impaled by (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} に襲われて逝ったみたい。`,
  ],
  fellOut4: [
    /^(.*) fell out of the world$/,
    (message, player) => `${player} が奈落の底へ落ちて逝ったみたい。`,
  ],
  fell2: [
    /^(.*) fell from a high place and fell out of the world$/,
    (message, player) =>
      `${player} が高いところからそのまま奈落の底へ落ちて逝ったみたい。`,
  ],
  denied: [
    /^(.*) didn't want to live in the same world as (.*)$/,
    (message, player, playerOrMob) =>
      `${player} が ${playerOrMob} から拒絶されて逝ったみたい。`,
  ],
  withered: [
    /^(.*) withered away$/,
    (message, player) => `${player} が干からびて逝ったみたい。`,
  ],
  pummeled: [
    /^(.*) was pummeled by (.*)$/,
    (message, victim, killer) =>
      `${victim} が ${killer} にぺしゃんこにされて逝ったみたい。`,
  ],
  died: [/^(.*) died$/, (message, player) => `${player} が逝ったみたい。`],
}
