const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Nuke channel"),
  permission: ["MANAGE_CHANNELS"],
  cooldown: 60000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} _
   */
  run: async (interaction, _) => {
    let channel = interaction.channel;
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
