const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows websocket ping"),
  cooldown: 10000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} client
   */
  run: async (interaction, client) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("ping")
        .setEmoji("🔃")
        .setLabel("Refresh")
        .setStyle("PRIMARY")
    );
    mongoose.connection.db.admin().ping(async (err, result) => {
      if (err || !result) this.mongoping = `nullms`;
      this.mongoping = `${result?.ok}ms`;

      await interaction.reply({
        embeds: [
          new MessageEmbed().setDescription(
            `Websocket ping: **[\`${client.ws.ping}ms\`](${global.link})**\nDatabase ping : **[\`${this.mongoping}\`](${global.link})**`
          ),
        ],
        components: [row],
        ephemeral: true,
      });
    });
  },
};
