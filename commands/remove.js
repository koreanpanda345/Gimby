const Discord = require('discord.js');
const botconfig = require('C:/Users/korea/source/repos/ConsoleApplication1/discord/other bots/Badge_Bot/settings.json')
module.exports.run = async(bot, message, args) =>{
  let prefix = botconfig.prefix;
  let infoEmbed = new Discord.RichEmbed()
  .setTitle('~INVALID USAGE~')
  .addField('Correct format.', `${prefix}rb <@who> <Badge Icon>`, false)
  .addField('Example', `${prefix}rb @koreanpanda345 🐼`);
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!(rUser || args[1]))return message.channel.send(infoEmbed);
  if(!(message.member.roles.find(r => r.name === 'Head Admin') || message.member.roles.find(r => r.name === 'Admin') || message.member.roles.find(r => r.name === 'Director'))) return message.reply('YOUR NOT AN ADMIN');
  let removeEmbed = new Discord.RichEmbed()
  .setTitle('~Badge Remove~')
  .setColor(0xff0010)
  .addField(`Trainer`, `${rUser}`)
  .addField('Admin', `<@${message.author.id}>`)
  .addField('Badge that been remove', `${args[1]}`);
  message.channel.send(removeEmbed);
  let badgeRole = message.guild.roles.find(r => r.name === `${args[1]}`);
  rUser.removeRole(badgeRole)
  .then(console.log)
  .catch(console.error);

}
module.exports.help = {
  name: "rb"
}
