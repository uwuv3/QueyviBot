const client = require("../..");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mongoose = require("mongoose");
const button_cooldowns = new Map();
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (
    interaction.customId === "help-previous" ||
    interaction.customId === "help-next"
  )
    return;
  //other
  if (button_cooldowns.get(`${interaction.user.id}:${interaction.customId}`)) {
    const embed = new MessageEmbed()
      .setTitle("Cooldown Alert")
      .setDescription(
        `The \`${interaction.customId}\` button has a \`${
          5000 / 1000
        }s\` cooldown. You still have to wait \`${
          button_cooldowns.get(
            `${interaction.user.id}:${interaction.customId}`
          ) / 1000
        }s\` until you can run the button again.`
      )
      .setColor("0x2F3136");

    return interaction.reply({ embeds: [embed], ephemeral: true });
  } else {
    var cooldown = 5000;
    button_cooldowns.set(
      `${interaction.user.id}:${interaction.customId}`,
      cooldown
    );

    var interval = setInterval(function () {
      button_cooldowns.set(
        `${interaction.user.id}:${interaction.customId}`,
        cooldown
      );
      cooldown -= 100;
    }, 100);

    setTimeout(function () {
      clearInterval(interval);
      button_cooldowns.delete(`${interaction.user.id}:${interaction.customId}`);
    }, 5000);
  }
  if (interaction.customId === "ping") {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("ping")
        .setEmoji("🔃")
        .setLabel("Refresh")
        .setStyle("PRIMARY")
    );
    mongoose.connection.db.admin().ping(async (err, result) => {
      if (err || !result) this.mongoping = `nullms`;
      this.mongoping = `${result?.ok}ms`;

      interaction.update({
        embeds: [
          new MessageEmbed().setDescription(
            `Websocket ping: **[\`${client.ws.ping}ms\`](${global.link})**\nDatabase ping : **[\`${this.mongoping}\`](${global.link})**`
          ),
        ],
        components: [row],
      });
    });
  } else {
  }
});
