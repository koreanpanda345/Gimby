const Discord = require('discord.js');
const botconfig = require('../settings.json')
module.exports.run = async(bot, message, args) =>{
  let prefix = botconfig.prefix;
  let reason = args.join(" ").slice(22);
  let infoEmbed = new Discord.RichEmbed()
  .setTitle('~INVALID USAGE~')
  .addField('Correct format.', `${prefix}rb <@who> <Badge Icon>`, false)
  .addField('Example', `${prefix}rb @koreanpanda345 🐼`);
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!(rUser || args[1]))return message.channel.send(infoEmbed);
  if(!reason){
    reason = "No reason";
  }
  if(!(message.member.roles.find(r => r.name === 'Head Admin') || message.member.roles.find(r => r.name === 'Admin') || message.member.roles.find(r => r.name === 'Director') || message.author.id === '304446682081525772')) return message.reply('YOUR NOT AN ADMIN');
  let removeEmbed = new Discord.RichEmbed()
  .setTitle('~Badge Remove~')
  .setColor(0xff0010)
  .addField(`Trainer`, `${rUser}`)
  .addField('Admin', `<@${message.author.id}>`)
  .addField('Badge that been remove', `${args[1]}`)
  .addField('Reason', reason);
  message.channel.send(removeEmbed);
  let badgeRole = message.guild.roles.find(r => r.name === `${args[1]}`);
  rUser.removeRole(badgeRole)
  .then(console.log)
  .catch(console.error);

}
module.exports.help = {
  name: "rb"
}
