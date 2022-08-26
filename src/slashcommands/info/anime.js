const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Interaction } = require("discord.js");
const Kitsu = require("../../../scripts/kitsu/Kitsu.js");
const kitsu = new Kitsu();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("search anime")
    .addStringOption((option) =>
      option.setName("name").setDescription("Anime Name?").setRequired(true)
    ),
  cooldown: 2000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} _
   */
  run: async (interaciton, _) => {
    let args = interaciton.options.getString("name");
    if (!args)
      return interaciton.reply({
        content: `**${interaciton.member?.username}**, enter the name of anime you are looking for!`,
        ephemeral: true,
      });

    await kitsu.searchAnime(args).then(async (result) => {
      const anime = result[0];
      if (result.length === 0)
        return interaciton.reply({
          content: `**${interaciton.member?.username}**, there is no result called **${args}**.`,
          ephemeral: true,
        });
      const info = new MessageEmbed()
        .setTitle(
          `**${anime.titles.romaji ? anime.titles.romaji : "Unknown"}**`
        )
        .setURL(anime.url)
        .setDescription(
          `**Synopsis:**\n> ${
            anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0]
          }`
        )
        .setThumbnail(anime.posterImage.original)
        .addField(
          "**Japanese:**",
          `${anime.titles.japanese ? anime.titles.japanese : "Unknown"}`,
          true
        )
        .addField(
          "**English:**",
          `${anime.titles.english ? anime.titles.english : "Unknown"}`,
          true
        )
        .addField(
          "**Rating:**",
          `${anime.averageRating ? anime.averageRating : "Unknown"}`,
          true
        )
        .addField(
          "**Start Date:**",
          `${anime.startDate ? anime.startDate : "Unknown"}`,
          true
        )
        .addField(
          "**End Date:**",
          `${anime.endDate ? anime.endDate : "Unknown"}`,
          true
        )
        .addField(
          "**Type:**",
          `${anime.showType ? anime.showType : "Unknown"}`,
          true
        )
        .addField(
          "**Episodes:**",
          `${anime.episodeCount ? anime.episodeCount : "Unknown"}`,
          true
        )
        .addField(
          "**Duration:**",
          `${anime.episodeLength ? anime.episodeLength : "??"} minutes`,
          true
        )
        .addField(
          "**Rank:**",
          `${anime.ratingRank ? anime.ratingRank : "Unknwon"}`,
          true
        )
        .setTimestamp(new Date());
      interaciton.reply({ embeds: [info] });
    });
  },
};
