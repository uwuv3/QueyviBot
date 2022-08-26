const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "kick",
	aliases: [""],
	permission: ["BAN_MEMBERS"],
	adminOnly: false,
	cooldown: 60000,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		let user = message.mentions.users.first();
		if (!user) return;
		let reason = args.join(" ");
		if (user.id === message.author.id)
			return interaction.reply({
				content: "You can't throw yourself",
				allowedMentions: { repiledUser: false },
			});
		if (user.id === client.user.id)
			return message.reply({
				content: "I can't throw myself",
				allowedMentions: { repiledUser: false },
			});
		if (message.guild.members.cache.get(user.id).permissions.has("BAN_MEMBERS"))
			return message.reply({
				content: "This user has **BAN_MEMBERS** Authorization",
				allowedMentions: { repiledUser: false },
			});
		if (!message.guild.members.cache.get(user.id))
			return message.reply({
				content: "This user does not exist on the server",
				allowedMentions: { repiledUser: false },
			});
		try {
			if (reason) {
				message.guild.members.cache.get(user.id).kick(reason);
				message.reply({
					embeds: [
						new MessageEmbed()
							.setDescription(`\`${user.tag}\`has been kicked from the server`)
							.setColor("GREEN"),
					],
				});
			} else if (!reason) {
				message.guild.members.cache.get(user.id).kick();
				message.reply({
					embeds: [
						new MessageEmbed()
							.setDescription(`\`${user.tag}\`has been kicked from the server`)
							.setColor("GREEN"),
					],
				});
			}
		} catch (err) {
			console.error(err);
		}
	},
};
