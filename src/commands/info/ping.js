const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
	name: "ping",
	aliases: [""],
	adminOnly: false,
	cooldown: 10000,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
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
			message.reply({
				embeds: [
					new MessageEmbed().setDescription(
						`Websocket ping: **[\`${client.ws.ping}ms\`](${global.link})**\nDatabase ping : **[\`${this.mongoping}\`](${global.link})**`
					),
				],
				components: [row],
			});
		});
	},
};
