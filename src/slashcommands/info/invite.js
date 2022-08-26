const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { bot } = require("../../../config");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Bot invite"),
    cooldown: 10000,
    /**
     *
     * @param {Interaction} interaciton
     * @param {Client} client
     */
    run:async(interaciton,client)=>{
        const genInvite = client.generateInvite({
            permissions: bot.invite.permissions,
            scopes: bot.invite.scopes,
          });
          await interaciton.reply({
            embeds: [
              new MessageEmbed()
                .setDescription(`[Click here and get the bot's invite](${genInvite})`)
                .setColor("RANDOM"),
            ],
          });
    }
};
