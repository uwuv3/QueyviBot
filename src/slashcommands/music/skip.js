const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qskip")
    .setDescription("skip the song"),
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
    if (!queue?.playing)
      return interaction.reply({
        content: "There is no song playing",
      });

    await queue.skip();
  },
};
