//config
const { bot } = require("../config");
//packages
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
//client
const client = new Client({
  intents: bot.intents,
  ws: { properties: { $browser: bot.properties.browser } },
});
module.exports = client;
//Collection
global.cmd_cooldown = new Map();
global.commands = new Collection();
global.aliases = new Collection();
global.scommands = new Collection();
global.events = new Collection();
//handler
const handler = readdirSync("./src/functions").filter((file) =>
  file.endsWith(".js")
);
for (file of handler) {
  require(`./functions/${file}`)(client);
}
client.login(process.env.token);
