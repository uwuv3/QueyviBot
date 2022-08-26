const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievement")
    .setDescription("Minecraft achievement")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription(
          '" | " between the message You can change it by putting'
        )
        .setRequired(true)
    ),
  cooldown: 10000,
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} _
   */
  run: async (interaction, _) => {
    const args = interaction.options.getString("text");
    let [title, contents] = args.split("|");
    if (!contents) {
      [title, contents] = ["Earned new achievement", title];
    }
    let rnd = Math.floor(Math.random() * 39 + 1);
    if (args.toLowerCase().includes("grass")) rnd = 1;
    if (args.toLowerCase().includes("diamond")) rnd = 2;
    if (args.toLowerCase().includes("burn")) rnd = 38;
    if (args.toLowerCase().includes("cookie")) rnd = 21;
    if (args.toLowerCase().includes("cake")) rnd = 10;

    if (title.length > 22 || contents.length > 22)
      return message.reply({ content: "You can use max 22 characters." });
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(
      title
    )}&t=${encodeURIComponent(contents)}`;
    const img = await fetch(url).then((img) => {
      return img.body;
    });
    const image = new MessageAttachment(img, "atc.png");
    interaction.reply({ files: [image] });
  },
};
