const { MessageEmbed } = require("discord.js");
const { bot } = require("../../../config");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  adminOnly: false,
  cooldown: 10000,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    const genInvite = client.generateInvite({
      permissions: bot.invite.permissions,
      scopes: bot.invite.scopes,
    });
    await message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`[Click here and get the bot's invite](${genInvite})`)
          .setColor("RANDOM"),
      ],
    });
  },
};
