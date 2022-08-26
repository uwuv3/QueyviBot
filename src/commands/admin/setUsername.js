const { bot } = require("../../../config");

module.exports = {
	name: "set-username",
	aliases: ["s-username"],
	permisson: ["MANAGE_NICKNAMES"],
	adminOnly: false,
	cooldown: 120000,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		if (bot.admins.includes(message.author.id)) {
			if (!args.join(" "))
				return message.reply({
					content: "Please specify a name",
					allowedmentions: { repiledUser: false },
				});
			let user = client.user.discriminator.toLocaleLowerCase().length;
			let arr = new Array(user + args.join(" ").length);
			client.user
				.setUsername(args.join(" "))
				.then(() => {
					message.reply("Succes");
					console.log(
						`├──${arr.join("─")}──┬\n│ ${
							args.join(" ") + "#" + client.user.discriminator
						} │ -> Changed Username\n├──${arr.join("─")}─•`
					);
				})
				.catch((err) => message.reply("ERROR" + `\n\`\`\`js\n${err}\n\`\`\``));
		} else {
			if (!args.join(" "))
				return message.reply({
					content: "Please specify a name",
					allowedmentions: { repiledUser: false },
				});
			let user = client.user.discriminator.toLocaleLowerCase().length;
			let arr = new Array(user + args.join(" ").length);
			message.guild.me
				.setNickname(args.join(" "))
				.then(() => {
					message.reply("Succes");
					console.log(
						`├──${arr.join("─")}─┬\n│ ${
							client.user.tag
						} │ -> Changed Username in ${message.guild.name}\n├──${arr.join(
							"─"
						)}─• New Username : ${message.guild.me.displayName}#${
							client.user.discriminator
						}`
					);
				})
				.catch((err) => message.reply("ERROR" + `\n\`\`\`js\n${err}\n\`\`\``));
		}
	},
};
