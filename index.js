console.clear();
require("dotenv").config();
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./src/index.js", {
  //totalShards: 1,
  token: process.env.token,
});
setInterval(() => {
  manager.respawnAll();
  console.log(
    `├──────────┬\n│ SHARDING │ -> All shards rebooted\n├──────────•`
  );
}, 86400000); //1 day

manager.on("shardCreate", (shard) =>
  console.log(
    `├──────────┬\n│ SHARDING │ -> Created shard ${shard.id}\n├──────────•`
  )
);

manager.spawn();