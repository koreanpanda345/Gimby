const Discord = require('discord.js');

exports.run = async(bot, message, args) =>{
    let sicon = message.guild.displayAvaterURL;
    let embed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor(0x42f47a)
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    return message.channel.send(embed);
}
module.exports.help = {
    name: "serverinfo"
}