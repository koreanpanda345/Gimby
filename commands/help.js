const Discord = require('discord.js');
const botconfig = require('C:/Users/korea/source/repos/ConsoleApplication1/discord/other bots/Badge_Bot/settings.json');

exports.run = (client, message, args, tools) =>{
  let prefix = botconfig.prefix;
  let pages = [`Help\nPrefix: ${prefix}\nMy Ping is ${client.ping}ms\nMy Library is discord.js`, `Pokemon\n${prefix}send <@who> <badge icon>: this can only be used by gym leaders, but this lets the gym leader give you your badge if you win.\n${prefix}rb <@who> <The badge icon>: This can only be used by admin up. This lets them to remove a badge from the trainer.`,
    `Music\nnote: you must be in a voice channel to use these commands.\n\n${prefix}play(p) <song name> this lets you play a song from youtube in the voice channel.\n${prefix}skip(s): lets you skip the current song\n${prefix}queue(q): shows you the server song queue\n${prefix}np: shows you what is playing right now\n${prefix}stop(st): Stops and disconnects from the voice channel\n${prefix}pause(pa): Pauses your queue.\n${prefix}resume(re): Resumes you queue\n${prefix}remove(r) <song queuing number>: Removes a song from queue by its queuing number\n${prefix}volume(vol) <1-5>:Changes the current songs volume, or checks to see what is the current volume is(default volume is at 5`];
      let page = 1;

      const embed = new Discord.RichEmbed()
      .setColor(0x43f47a)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1])

      message.channel.send(embed).then(msg => {
        msg.react('⏪').then(r => {
          msg.react('⏩')
          //filters
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

          const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
          const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000});

          backwards.on('collect', r => {
            if(page === 1)return;
            --page;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed);
          })

          forwards.on('collect', r => {
            if(page === pages.length) return;
            ++page;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed);
          })
        })
      })
}
module.exports.help ={
  name: "help"
}
