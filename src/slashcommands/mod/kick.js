const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick any user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Who kick").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for expulsion")
    ),
  permission: ["BAN_MEMBERS"],
  cooldown:60000,
   /**
   *
   * @param {Interaction} interaciton
   * @param {Client} client
   */
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    if (user.id === interaction.member.id)
      return interaction.reply({
        content: "You can't throw yourself",
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.reply({
        content: "I can't throw myself",
        ephemeral: true,
      });
    if (
      interaction.guild.members.cache
        .get(user.id)
        .permissions.has("BAN_MEMBERS")
    )
      return interaction.reply({
        content: "This user has **BAN_MEMBERS** Authorization",
        ephemeral: true,
      });
    if (!interaction.guild.members.cache.get(user.id))
      return interaction.reply({
        content: "This user does not exist on the server",
        ephemeral: true,
      });
    try {
      if (reason) {
        interaction.guild.members.cache.get(user.id).kick(reason);
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`\`${user.tag}\`has been kicked from the server`)
              .setColor("GREEN"),
          ],
        });
      } else if (!reason) {
        interaction.guild.members.cache.get(user.id).kick();
        interaction.reply({
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
