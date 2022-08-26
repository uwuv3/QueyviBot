const modal = require("../../schemas/guild");
const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "autorole",
	aliases: ["auto-role"],
	permission: ["MANAGE_GUILD"],
	adminOnly: false,
	cooldown: 120000,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		let type = args[0];
		if (type === "on") {
			let role = message.mentions.roles.first();
			if (!role)
				return message.reply({
					embeds: [
						new MessageEmbed()
							.setDescription("Please indicate a role")
							.setColor("RED"),
					],
					allowedMentions: { repiledUser: false },
				});
			if (role.name === "@everyone")
				return message.channel.send({
					embeds: [
						new MessageEmbed()
							.setDescription("Please indicate a role")
							.setColor("RED"),
					],
					allowedMentions: { repiledUser: false },
				});
			if (role.name === "@here")
				return message.channel.send({
					embeds: [
						new MessageEmbed()
							.setDescription("Please indicate a role")
							.setColor("RED"),
					],
					allowedMentions: { repiledUser: false },
				});
			await modal.updateOne(
				{ guildID: message.guild.id },
				{ autoRole: role.id },
				{ upsert: true }
			);
			message.reply({
				embeds: [
					new MessageEmbed()
						.setTitle("SUCCES")
						.setColor("GREEN")
						.setDescription(
							`Autorole set successfully\nAutorole role : ${role}`
						),
				],
			});
		} else if (type === "off") {
			await modal.updateOne(
				{ guildID: message.guild.id },
				{ autoRole: null },
				{ upsert: true }
			);
			message.reply({
				embeds: [
					new MessageEmbed()
						.setTitle("SUCCES")
						.setColor("DARK_GREEN")
						.setDescription(
							`Autorole set successfully\nAutorole role : \`null\``
						),
				],
			});
		} else {
			message.reply({
				content: "on/off",
				allowedMentions: { repiledUser: false },
			});
		}
	},
};
