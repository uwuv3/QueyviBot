const client = require("../..");
const PermissionsFlags = require("../../../perm_flags");
const { MessageEmbed } = require("discord.js");
const command_cooldowns = global.cmd_cooldown;
client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot) return;
  if (interaction.isCommand()) {
if(!interaction.inGuild()) return
    const command = global.scommands.get(interaction.commandName);
    if (!command) return;
    if(!interaction.member) client.users.cache.get(interaction.user.id)
    let bot = [];
    let invalidUser = [];
    if (command.permission && command.permission.length) {
      for (const permission of command.permission) {
        if (!PermissionsFlags.includes(permission)) {
          return console.log(`Invalid Permissions : ${permission}`);
        }

        if (!interaction.member.permissions.has(permission)) {
          invalidUser.push(permission);
        }

        if (!interaction.guild.me.permissions.has(permission)) {
          bot.push(permission);
        }
      }
    }
    if (bot.length > 0) {
      const noPermissionEmbed = new MessageEmbed()
        .setColor("RED")

        .setDescription(
          `I need to have \`${bot}\` privileges to use this command.`
        );

      return message.reply({
        embeds: [noPermissionEmbed],
        ephemeral: true,
      });
    } else if (invalidUser.length > 0) {
      const noPermissionEmbed = new MessageEmbed()
        .setColor("RED")

        .setDescription(
          `To be able to use this command, it must have \`${invalidUser}\` privileges.`
        );
      return interaction.reply({
        embeds: [noPermissionEmbed],
        ephemeral: true,
      });
    } else {
      if (command.cooldown) {
        if (
          command_cooldowns.get(
            `${interaction.user.id}:${interaction.commandName}`
          )
        ) {
          const embed = new MessageEmbed()
            .setTitle("Cooldown Alert")
            .setDescription(
              `The \`${interaction.commandName}\` command has a \`${
                command.cooldown / 1000
              }s\` cooldown. You still have to wait \`${
                command_cooldowns.get(
                  `${interaction.user.id}:${interaction.commandName}`
                ) / 1000
              }s\` until you can run the command again.`
            )
            .setColor("0x2F3136");

          return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          var cooldown = command.cooldown;
          command_cooldowns.set(
            `${interaction.user.id}:${interaction.commandName}`,
            cooldown
          );

          var interval = setInterval(function () {
            command_cooldowns.set(
              `${interaction.user.id}:${interaction.commandName}`,
              cooldown
            );
            cooldown -= 100;
          }, 100);

          setTimeout(function () {
            clearInterval(interval);
            command_cooldowns.delete(
              `${interaction.user.id}:${interaction.commandName}`
            );
          }, command.cooldown);
        }
      }

      await command.run(interaction, client);
    }
  }
});
