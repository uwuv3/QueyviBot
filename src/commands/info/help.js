const page = require("../../../scripts/discordjs-button-pagination/msg");
const {
  pages,
  buttonList,
  timeout,
} = require("../../embeds&buttons/helpcommand");
module.exports = {
  name: "help",
  aliases: ["h"],
  adminOnly: false,
  cooldown: 600000,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    page(message, pages, buttonList, timeout);
  },
};
