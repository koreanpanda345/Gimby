const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) message.channel.send('Please enter a trainer that you want to remove a badge from.');
  if(!args[1]) return message.channel.send('Please enter the badge you want to remove');
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
