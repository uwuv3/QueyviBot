const client = require("../..");
const { Player } = require("discord-player");
const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});
client.player = player;
player.on("error", (queue, error) => {
  console.log(
    `├────────┬\n│ PLAYER │ -> ${queue.guild.name} Error from queue: ${error.message}\n├────────•`
  );
});
player.on("connectionError", (queue, error) => {
  console.log(
    `├────────┬\n│ PLAYER │ -> ${queue.guild.name} Error from connection: ${error.message}\n├────────•`
  );
});
player.on("botDisconnect", (queue) => {
  queue.metadata.send(
    "❌ | I was manually disconnected from the audio channel, the queue was cleared!"
  );
});
player.on("channelEmpty", (queue) => {
  queue.metadata.send("❌ | No one on the audio channel, leaving...");
});
player.on("trackStart", (queue, track) =>
  queue.metadata.send(`🎶 | Now playing **\`${track.title}\`**!`)
);
player.on("queueEnd", (queue) => {
  queue.metadata.send("✅ | Queue done!");
});
player.on("error",(error)=>{
  console.log(
    `├────────┬\n│ PLAYER │ -> Error : ${error.message}\n├────────•`
  );
})