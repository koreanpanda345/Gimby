const Discord = require('discord.js');

exports.run = (client, message, args, tools) =>{
  let pages = [`Leader\n<@${message.guild.roles.get('517378541768146968').members.map(m=>m.user.id)}>\nFire Gym Leader\n\nBadge: 🔥\n\nGYM: <#510698513475043356>`, `Leader\n<@${message.guild.roles.get('511641240668995615').members.map(m=>m.user.id)}>\nBug Gym Leader\n\nBadge: 🐛\n\nGYM: <#510698721852522498>`, `Leader\n<@${message.guild.roles.get('512097375397871623').members.map(m=>m.user.id)}>\nGround Gym Leader\n\nBadge: 🗻\n\nGYM: <#510698765041139713>`, `Leader\n<@${message.guild.roles.get('515404694537895936').members.map(m=>m.user.id)}>\nElectric Gym Leader\n\nBadge: ⚡\n\nGYM: <#510698753888616448>`, `Leader\n<@${message.guild.roles.get('513396668628992003').members.map(m=>m.user.id)}>\nDark Gym Leader\n\nBadge: 💀\n\nGYM: <#510698742333177856>`, `Leader\n<@${message.guild.roles.get('524351274813227035').members.map(m=>m.user.id)}>\nSteel Gym Leader\n\nBadge: ⛓\n\nGYM:
<#510698694090293258>`, `Leader\n<@${message.guild.roles.get('511641459003359246').members.map(m=>m.user.id)}>\nFairy Gym Leader\n\nBadge: 🦄\n\nGYM:<#510698711085481984>`, `Leader\n<@${message.guild.roles.get('518250194370822180').members.map(m=>m.user.id)}>\nPoison Gym Leader\n\nBadge: 🐍\n\nGYM:<#510698678839803905>`];
  let page = 1;

  const embed = new Discord.RichEmbed()
  .setColor(0x43f47a)
  .setFooter(`Gym ${page} of ${pages.length}`)
  .setDescription(pages[page-1])

  message.channel.send(embed).then (msg =>{
    msg.react('⏪').then( r => {
      msg.react('⏩')

      //filters
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
      const forwards = msg.createReactionCollector(forwardsFilter, {time : 60000});

      backwards.on('collect', r => {
        if(page === 1) return;
        --page;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
      })
      forwards.on('collect', r => {
        if(page === pages.length) return;
        ++page;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(embed)
      })
    })
  })
}
module.exports.help = {
  name: "leaders"
}
