const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qresume")
    .setDescription("continues the song"),
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

    if (queue.setPaused == false) {
      interaction.reply({ content: "No paused songs" });
    } else {
      queue.setPaused(false);
    }

    return interaction.reply({ content: "The song goes on!" });
  },
};
