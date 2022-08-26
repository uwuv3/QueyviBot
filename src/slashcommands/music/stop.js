const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qstop")
    .setDescription("ends the playing song"),
  cooldown: 1000,
  permission: ["SEND_MESSAGES"],
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} client
   */
  run: async (interaction, client) => {
    const player = client.player;
    const queue = player.getQueue(interaction.guildId);
    queue.stop();
  },
};
