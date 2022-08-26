const client = require("../..");
const { bot } = require("../../../config");
const prefix = bot.prefix;
const PermissionsFlags = require("../../../perm_flags");
const { MessageEmbed } = require("discord.js");
const command_cooldowns = global.cmd_cooldown;
client.on("messageCreate", async (message) => {
  //other
  if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);


  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = global.commands.get(cmd);
  if (!command) command = global.commands.get(global.aliases.get(cmd));
  if (!message.member) client.users.cache.get(message.author.id);
  //Only
  if (command.adminOnly) {
    if (!bot.admins.includes(message.author.id))
      return message.reply({
        content: "this command is only for bot admins",
        allowedMentions: { repliedUser: false },
      });
  }
  //perm
  if (!command) return;
  if (command.permission && command.permission.length) {
    for (const permission of command.permission) {
      if (!PermissionsFlags.includes(permission)) {
        return console.log(`Invalid Permissions : ${permission}`);
      }
      let invalidUser = [];
      if (!message.member.permissions.has(permission)) {
        invalidUser.push(permission);
      }
      let bot = [];
      if (!message.guild.me.permissions.has(permission)) {
        bot.push(permission);
      }
      if (bot.length > 0) {
        const noPermissionEmbed = new MessageEmbed()
          .setColor("RED")

          .setDescription(
            `I need to have \`${bot}\` privileges to use this command.`
          );

        return message.reply({
          embeds: [noPermissionEmbed],
          allowedMentions: { repliedUser: false },
        });
      }
      if (invalidUser.length > 0) {
        const noPermissionEmbed = new MessageEmbed()
          .setColor("RED")

          .setDescription(
            `To be able to use this command, it must have \`${invalidUser}\` privileges.`
          );
        return message.reply({
          embeds: [noPermissionEmbed],
          allowedMentions: { repliedUser: false },
        });
      }
    }
  }
  //cooldown
  if (command.cooldown) {
    if (command_cooldowns.get(`${message.author.id}:${command.name}`)) {
      const embed = new MessageEmbed()
        .setTitle("Cooldown Alert")
        .setDescription(
          `The \`${command.name}\` command has a \`${
            command.cooldown / 1000
          }s\` cooldown. You still have to wait \`${
            command_cooldowns.get(`${message.author.id}:${command.name}`) / 1000
          }s\` until you can run the command again.`
        )
        .setColor("0x2F3136");

      return message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } else {
      var cooldown = command.cooldown;
      command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown);

      var interval = setInterval(function () {
        command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown);
        cooldown -= 100;
      }, 100);

      setTimeout(function () {
        clearInterval(interval);
        command_cooldowns.delete(`${message.author.id}:${command.name}`);
      }, command.cooldown);
    }
  }
  if (command) {
    /**
     *
     * @param {Message} message
     * @param {Client} client
     * @param {String[]} args
     */
    await command.run(message, client, args);
  }
});
