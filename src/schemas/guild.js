const { Schema, model } = require("mongoose");
module.exports = model(
  "guild",
  new Schema({
    guildID: String, //guild id
    autoRole: String, // role id
    autoTag:String // tag id
  })
);
