const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qlist")
    .setDescription("show song order"),
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
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
    });
    return interaction.reply({
      embeds: [
        {
          title: "song queue",
          description: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
              ? `\n...${
                  queue.tracks.length - tracks.length === 1
                    ? `${queue.tracks.length - tracks.length} More...`
                    : `${queue.tracks.length - tracks.length} More...`
                }`
              : ""
          }`,
          color: "RANDOM",
          fields: [
            {
              name: "currently playing:",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
            },
          ],
        },
      ],
    });
  },
};
