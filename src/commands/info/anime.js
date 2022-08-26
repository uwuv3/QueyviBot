const { MessageEmbed } = require("discord.js");
const Kitsu = require("../../../scripts/kitsu/Kitsu.js");
const kitsu = new Kitsu();
module.exports = {
  name: "anime",
  aliases:[""],
  adminOnly:false,
  cooldown: 2000,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (!args[0])
      return message.reply({
        content: `**${message.author.username}**, enter the name of anime you are looking for!`,
        allowedMentions: { repiledUser: false },
      });
    const search = args.join(" ");
    kitsu.searchAnime(search).then(async (result) => {
      const anime = result[0];
      if (result.length === 0)
        return message.reply({
          content: `**${message.author.username}**, there is no result called **${search}**.`,
          allowedMentions: { repiledUser: false },
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
      message.reply({ embeds: [info] });
    });
  },
};
