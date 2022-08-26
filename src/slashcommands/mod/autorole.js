const modal = require("../../schemas/guild");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription("Autorole ._.")

    .addSubcommand((options) =>
      options
        .setName("on")
        .setDescription("Set autorole role")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Role to set ._.")
            .setRequired(true)
        )
    )
    .addSubcommand((option) =>
      option.setName("off").setDescription("Reset autorole role")
    ),
  permission: ["MANAGE_GUILD"],
  cooldown: 120000,
  /**
   *
   * @param {Interaction} interaciton
   * @param {Client} _
   */
  run: async (interaction, _) => {
    const command = interaction.options.getSubcommand();
    switch (command) {
      case "on": {
        let role = interaction.options.getRole("role");
        if (role.name === "@everyone")
          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setDescription("Please indicate a role")
                .setColor("RED"),
            ],
          });
        if (role.name === "@here")
          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setDescription("Please indicate a role")
                .setColor("RED"),
            ],
          });
        await modal.updateOne(
          { guildID: interaction.guild.id },
          { autoRole: role.id },
          { upsert: true }
        );
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("SUCCES")
              .setColor("GREEN")
              .setDescription(
                `Autorole set successfully\nAutorole role : ${role}`
              ),
          ],
        });
        break;
      }
      case "off": {
        await modal.updateOne(
          { guildID: interaction.guild.id },
          { autoRole: null },
          { upsert: true }
        );
        interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("SUCCES")
              .setColor("DARK_GREEN")
              .setDescription(
                `Autorole set successfully\nAutorole role : \`null\``
              ),
          ],
        });
      }
    }
  },
};
