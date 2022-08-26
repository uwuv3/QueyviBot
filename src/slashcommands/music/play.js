const { QueryType } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qplay")
    .setDescription("Play a music")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the music?")
        .setRequired(true)
    ),
  cooldown: 1000,
  permission: ["SEND_MESSAGES"],
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} client
   */
  run: async (interaction, client) => {
    const player = client.player;
    const songTitle = interaction.options.getString("name");
    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "Please join an audio channel first!",
      });
    const searchResult = await player.search(songTitle, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
