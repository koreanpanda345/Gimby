const Discord = require('discord.js');
module.exports.run = async (bot, message, args) =>{
  let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!sUser) message.channel.send('Please enter a trainer that you want to give the badge.');
  if(!args[1]) return message.channel.send("Please enter your badge icon");
 if(!(message.member.roles.find(r => r.name === 'Gym Leaders') || message.author.id === '304446682081525772')) return message.reply("HAHAHAHAH, YOU THOUGHT YOU CAN GET AWAY, HAHAHAHA NOPE I AM TELLING THE ADMIN -w-");
  let sendEmbed = new Discord.RichEmbed()
  .setTitle('~Badge Receive~')
  .setColor(0x42f44b)
  .addField(`Trainer`, `${sUser}`)
  .addField('Badge', `${args[1]}`);
  message.channel.send(sendEmbed);
  let badgeRole = message.guild.roles.find(r => r.name === `${args[1]}`);
  if(!badgeRole){
    try{
      badgeRole = await message.guild.createRole({
        name: `${args[1]}`,
        color: "#000000",
        permission: []
      })
    } catch(e){
      console.log(e.stack);
    }
    }
    await(sUser.addRole(badgeRole.id));
}
module.exports.help = {
  name: "send"
}
