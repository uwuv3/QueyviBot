module.exports = {
	name: "nuke",
	aliases: [""],
	permission: ["SEND_MESSAGES", "MANAGE_CHANNELS"],
	cooldown: 60000,
	adminOnly: false,
	/**
	 *
	 * @param {Message} message
	 * @param {Client} client
	 * @param {String[]} args
	 */
	run: async (message, client, args) => {
		let channel = message.channel;
		channel.clone(channel.name, { reason: "Nuked" }).then(async (chnl) => {
			chnl.setPosition(channel.position);
			await channel.delete();
			chnl
				.send({
					content: "https://imgur.com/a/rwoCmQS",
				})
				.then((msg) => {
					setTimeout(function () {
						msg.delete();
					}, 3000);
				});
		});
	},
};
