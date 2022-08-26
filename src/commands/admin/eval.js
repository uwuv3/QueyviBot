const { MessageEmbed } = require("discord.js");
const clean = require("../../../scripts/util/clean");
const hastebin = require("../../../scripts/util/create-hastebin");
const inspect = require("../../../scripts/util/inspect");
module.exports = {
	name: "eval",
	aliases: ["$"],
	adminOnly: true,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		const code = args.join(" ");
		const mu = Date.now();
		try {
			if (!code)
				return message.reply({
					content: "You must enter a code to use the eval command.",
					allowedMentions: { repiledUser: false },
				});
			let evaled = eval(code);
			if (typeof evaled !== "string") evaled = inspect(evaled);
			let output = clean(evaled);
			if (output.length > 1024 || code.length > 1024)
				output = await hastebin(output);
			const emb = new MessageEmbed()
				.setColor("#81FF00")
				.addField("📥 INPUT", code);
			await emb.addField("📤OUTPUT", output);
			return message.reply({
				embeds: [emb.setFooter({ text: `\`${Date.now() - mu}ms\`` })],
			});
		} catch (err) {
			let error = clean(err);
			if (error.length > 1024) error = await hastebin(error);
			emb.addField("⛔ERROR", error);
			return message.reply({
				embeds: [emb.setFooter({ text: `\`${Date.now() - mu}ms\`` })],
			});
		}
	},
};
