const client = require("../..");
const { bot } = require("../../../config");
client.on("ready", async () => {
  client.user.setStatus(bot.presence.status.toLowerCase());
  let i = 0;
  let a = bot.presence.activities;
  setInterval(() => {
    let b = a[i++ % a.length];
    client.user.setPresence({
      activities: [{ name: b, type: bot.presence.type.toUpperCase() }],
    });
  }, bot.presence.changes);
  let user = client.user.tag.toLocaleLowerCase().length;
  let arr = new Array(user);
  console.log(
    `├──${arr.join("─")}─┬\n│ ${client.user.tag} │ -> I'm ready\n├──${arr.join(
      "─"
    )}─•`
  );
});
