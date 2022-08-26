const { MessageEmbed, MessageButton } = require("discord.js");
const embed1 = new MessageEmbed()
  .setTitle("Welcome to Main")
  .setDescription(
    `Page 1 **»** Main commands \nPage 2 **»** Info commands \nPage 3 **»** Mod commands \nPage 4 **»** Music commands \nPage 5 **»** User commands \nPage 6 **»** Fun commands`
  );

const embed2 = new MessageEmbed()
  .setTitle("Welcome to Info")
  .setDescription(
    `anime **»** Search Anime \nhelp **»** Help command \nping **»** Show ping\ninvite **»** Bot invite`
  );

const embed3 = new MessageEmbed()
  .setTitle("Welcome to Mod")
  .setDescription(
    `autorole **»** Autorole ._. \nkick **»** Kick any user \nnuke **»** Nuke channel`
  );
const embed4 = new MessageEmbed()
  .setTitle("Welcome to Music")
  .setDescription(
    `qlist **»** Show song order \nqpause **»** Pauses the song \nqplay **»** Play a music\nqresume **»** Contiunes the song\nqskip **»** Skip the song\nqstop **»** Ends the playing song`
  )
  .addField("WARNING", "Only Slash command");
const embed5 =new MessageEmbed()
.setTitle("Welcome to User")
.setDescription(
  `avatar **»** Get user Avatar`
);
const embed6 =new MessageEmbed()
.setTitle("Welcome to Fun")
.setDescription(
  `meme **»** Send A Meme\nachievement **»** Minecraft achievement`
);
const button1 = new MessageButton()
  .setCustomId("help-previous")
  .setLabel("Previous")
  .setStyle("DANGER");

const button2 = new MessageButton()
  .setCustomId("help-next")
  .setLabel("Next")
  .setStyle("SUCCESS");

const pages = [embed1, embed2, embed3,embed4,embed5,embed6];

const buttonList = [button1, button2];
const timeout = 600000;
module.exports = { pages, buttonList, timeout };
