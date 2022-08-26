const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");
const hastebin = require("../../../scripts/util/create-hastebin");
module.exports = {
  name: "exec",
  aliases: ["$", "bash"],
  adminOnly: true,
  /**
   *
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async (message, client, args) => {
    if (!args.join(" "))
      return message.reply({
        content: "No parameter to execute. you're stuppid",
        allowedMentions: { repiledUser: false },
      });
    let command = `\`\`\`bash\n${args.join(" ")}\`\`\``;
    const emb = new MessageEmbed()
      .setColor("#81FF00")
      .addField("📥 INPUT", command);
    exec(args.join(" "), async (error, stdout, stderr) => {
      const mu = Date.now();
      if (stdout) {
        let output = `\`\`\`bash\n${stdout}\`\`\``;
        if (stdout.length > 1024) {
          output = await hastebin(stdout);
        }
        emb.addField("📤OUTPUT", output);
      } else if (stderr) {
        emb.setColor("#FF0000");
        let error = `\`\`\`bash\n${stderr}\`\`\``;
        if (stderr.length > 1024) {
          error = await hastebin(stderr);
        }
        emb.addField("⛔ERROR", error);
      } else {
        emb.addField(
          "📤OUPUT",
          "```bash\n# Command executed successfully but returned no output.```"
        );
      }
      return message.reply({
        embeds: [emb.setFooter({ text: `\`${Date.now() - mu}ms\`` })],
      });
    });
  },
};
