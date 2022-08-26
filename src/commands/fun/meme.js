const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "meme",
	aliases: [""],
	adminOnly: false,
	cooldown: 2000,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		await fetch("https://meme-api.herokuapp.com/gimme")
			.then((res) => res.json())
			.then((json) => {
				message.reply({
					embeds: [
						new MessageEmbed()
							.setColor("BLURPLE")
							.setTitle(`${json.title}`)
							.setURL(json.postLink)
							.setImage(json.url)
							.setFooter({ text: `From /r/${json.subreddit}` }),
					],
				});
			});
	},
};
