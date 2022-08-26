const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder().setName("meme").setDescription("Send A Meme"),
	cooldown: 2000,
	/**
	 *
	 * @param {Interaction} interaction
	 * @param {Client} _
	 */
	run: async (interaction, _) => {
		await fetch("https://meme-api.herokuapp.com/gimme")
			.then((res) => res.json())
			.then((json) => {
				interaction.reply({
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
