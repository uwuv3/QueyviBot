const client = require("../..");
const modal = require("../../schemas/guild");
client.on("guildMemberAdd", async (member) => {
  let { autoRole } = (await modal.findOne({ guildID: member.guild.id })) || {
    autoRole: null,
  };
  client;
  if (!autoRole) {
    return;
  } else {
    try {
      let role = client.guilds.cache
        .get(member.guild.id)
        .roles.cache.get(autoRole);

      await client.guilds.cache
        .get(member.guild.id)
        .members.cache.get(member.id)
        .roles.add(role);
    } catch (err) {
      await modal.updateOne(
        { guildID: member.guild.id },
        { autoRole: null },
        { upsert: true }
      );
      console.log(`*----------*\n* AUTOROLE * -> Error;\n*----------* ${err}`);
      let owner = member.guild.fetchOwner();
      client.users.cache
        .get((await owner).user.id)
        .createDM()
        .then((user) =>
          user.send({ content: `ERROR: \`\`\`js\nAUTOROLE:\n${err}\n\`\`\`` })
        );
    }
  }
});
