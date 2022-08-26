const { SlashCommandBuilder } = require("@discordjs/builders");
const page = require("../../../scripts/discordjs-button-pagination/interaction");
const {
  pages,
  buttonList,
  timeout,
} = require("../../embeds&buttons/helpcommand")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows command"),
  cooldown: 600000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} client
   */
  run: async (interaction, _) => {
    page(interaction, pages, buttonList, timeout);
  },
};
