const { Permissions } = require("discord.js");

const bot = {
  intents: 131071, //https://ziad87.net/intents/
  invite: {
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    scopes: ["applications.commands", "bot"],
  },
  prefix: "?", //bot prefix
  admins: ["984439714851479593"],
  properties: {
    browser: "Discord Android", // default : discord.js
  },
  presence: {
    status: "online", //online,idle,dnd,offline
    activities: ["LoL", "Made by uwuv3"],
    type: "Competing", //Playing,Streaming,Listening,Watching,Custom,Competing
    changes: 10000,
  },
};
global.link = "https://discord.com/users/984439714851479593";
module.exports = { bot };
