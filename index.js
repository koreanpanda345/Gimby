process.on('unhandledRejection', console.error);

const botconfig = require('../Badge_Bot/settings.json');
const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const bot = new Client({disableEveryone: true});
const fs = require('fs');
const iheart = require('iheart');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(botconfig.yt_api_key);
const queue = new Map();

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('I just disconnected'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));

//Command handler
bot.commands = new Discord.Collection();

const bot_controller = botconfig.bot_controller;
fs.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't Find Commands");
    return;
  }
  console.log(`|-------------------------------------------|`);
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`|     ${f} loaded!`);
    console.log(`|-------------------------------------------|`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () =>{
  let prefix = botconfig.prefix;
  let status = "updating";//update, updating, fixing, new, 
  let command = "";
  let functions = "";
  
  if(status === "update"){
      console.log(`|-------------------------------------------|`);
      if(command === ""){
          console.log(`|Function: ${functions}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a update. The update is ${functions}.`, {type: "WATCHING"});
          bot.user.setStatus('online');
      }
      else if(functions === ""){
          console.log(`|Command: ${command}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a update. The update is ${prefix}${commands}`, {type: "WATCHING"});
          bot.user.setStatus("online");
      }
      else if(functions === "" && command === ""){
          console.log("|");
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a update.`, {type: "WATCHING"});
          bot.user.setStatus("online");
      }
      else{
          console.log(`|Command: ${command}`);
          console.log(`|Function: ${functions}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a update. The update is ${prefix}${commands}, and ${functions}`, {type: "WATCHING"});
          bot.user.setStatus("online");
      }
  }
  else if(status === "updating"){
      console.log(`|-------------------------------------------|`);
      console.log(`|Being worked on: True`);
      console.log(`|-------------------------------------------|`);
      bot.user.setActivity(`Gimby is being worked on. please wait till you don't see this message.`, {type: "WATCHING"});
      bot.user.setStatus("dnd");
  }
  else if(status === "Fixing"){
      console.log(`|-------------------------------------------|`);
      console.log(`|Being worked on: True`);
      console.log(`|-------------------------------------------|`);
      bot.user.setActivity(`Gimby is being worked on. please wait till you don't see this message.`, {type: "WATCHING"});
      bot.user.setStatus("dnd");
  }
  else if(status === "new"){
      console.log(`|-------------------------------------------|`);
      if(command === ""){
          console.log(`|Function: ${functions}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a new Function. Which is ${functions}.`, {type: "WATCHING"});
          bot.user.setStatus('online');
      }
      else if(functions === ""){
          console.log(`|Command: ${command}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a new command. The new command is ${prefix}${commands}`, {type: "WATCHING"});
          bot.user.setStatus("online");
      }
      else{
          console.log(`|Command: ${command}`);
          console.log(`|Function: ${functions}`);
          console.log(`|-------------------------------------------|`);
          bot.user.setActivity(`Gimby has gotten a new command. The new command is ${prefix}${commands}, and a new function which is ${functions}`, {type: "WATCHING"});
          bot.user.setStatus("online");
  }

  }
  else{
      console.log(`|-------------------------------------------|`);
      console.log(`|default`);
      console.log(`|-------------------------------------------|`);
      bot.user.setActivity(`panda!help`);
      bot.user.setStatus("online");
  }
  console.log(`Gimby is in ${bot.guilds.size} servers, ${bot.channels.size} channels, and ${bot.users.size} users.`);
  
});
bot.on("guildMemberAdd", async member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'general');
      if (!channel) return;
      let welcomeEmbed = new Discord.RichEmbed()
      .setTitle(`Welcome New Member`)
      .setColor(0x43f47a)
      .setDescription(`Welcome to iG Pokefinium ${member} Please take a look at <#506646749239050246> and other areas of importance. If you would like to join the Pokemon League, then please dm or @ <@147230160016375808> Have fun and I hope you find a home here with us!`);
      channel.send(welcomeEmbed);
      //channel.send(`Welcome to Pokefinium ${member} Please take a look at <#506646749239050246> and other areas of importance. Have fun and I hope you find a home here with us!`)
});
bot.on('message', async message =>{
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let prefix = "badge!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);


  if(cmd === `${prefix}ping`){
    message.channel.send(`Pong: ${bot.ping}ms`);
  }
  else if(cmd ===`${prefix}request`){
     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) message.channel.send('Please enter the Gym Leader.');
     rUser.send(`${message.author.id} is requesting a badge. If you accept, then type in the server badgesend @who`);
     message.channel.send('Request has been sent.');
  }
  else if(cmd === `${prefix}question`){
    if(args[0] === 'are' && args[1] === `legendries` && args[2] === `allowed`){
      let legendEmbed = new Discord.RichEmbed()
      .setTitle(`ARE LEGENDRIES ALLOWED???`)
      .addField(`The Answer:`, ` No, HOWEVER, gym leaders, and elite four are allowed to have one mythical pokemon or ubs(Ultra Beast), but not for the challengers!!!`);
      message.channel.send(legendEmbed);
    }
    if(args[0] === 'are' && args[1] === 'gym' && args[2] === 'battles' && args[3] === 'bo1' && args[4] ==='or' && args[5] === 'bo3'){
      let gymBattlesEmbed = new Discord.RichEmbed()
      .setTitle(`ARE GYM BATTLES BO1 OR BO31`)
      .addField(`The Answer:`, `It depends on the gym leader, some do bo1, and some do bo3. but at default it is bo1 due to leaders have lives outside of the server.`);
      message.channel.send(gymBattlesEmbed);
    }
  }
    //music commands
    //will let the user play music in th voice channel, and have control
    var guild = {};
    const searchString = args.slice(0).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id);

    if(cmd === `${prefix}p` || cmd === `${prefix}play`){
      let pEmbed = new Discord.RichEmbed()
        .setTitle(`INVALID USEAGE`)
        .setAuthor(message.author.username)
        .addField('Correct Formatting', `*${prefix}p <song name>* or *${prefix}play <song name>* `)
        .addField('Example:', `*${prefix}p goddess chrome spark* or *${prefix}play goddess chrome spark*`);
      if(!args[0])return message.channel.send(pEmbed);
      const voiceChannel = message.member.voiceChannel;
      if(!voiceChannel) return message.channel.send("I'm sorry, but you need to be in a voice channel to play music");
      const permissions = voiceChannel.permissionsFor(bot.user);
      if(!permissions.has('CONNECT')){
        return message.channel.send('I cannot connect in this voice channel, please make sure I have the right permission');
      }
      if(!permissions.has('SPEAK')){
        return message.channel.send('I cannot speak in this voice channel, please make sure I have the right permission.');
      }

      if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
        const playlist = await youtube.getPlaylist(url);
        return console.log(playlist);
        const videos = await playlist.getVideo();
        for(const video of Object.values(videos)){
          const video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2. message, voiceChannel, true);
        }
        return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
      } else {
        try {
          var videos = await youtube.searchVideos(searchString, 1);
        var video = await youtube.getVideoByID(videos[0].id);
        } catch(err){
          console.error(err);
          return message.channel.send('🆘 I could not obtain any search results.');
        }
      }
      return handleVideo(video, message, voiceChannel);
    } else if(cmd === `${prefix}s`|| cmd === `${prefix}skip`){
      if(!message.member.voiceChannel) return message.channel.send("Your not in a voice channel!");
      if(!serverQueue) return message.channel.send("There is nothing playing that I could skip for you");
      serverQueue.connection.dispatcher.end('Skip cmd has been used!');
      return undefined;
    } else if(cmd === `${prefix}st`|| cmd === `${prefix}stop`){
      if(!message.member.voiceChannel) return message.channel.send('Your not in a voice channel!');
      if(!serverQueue) return message.channel.send("There is nothing playing that i could stop for you");
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end('Stop cmd has been used!');
      return undefined;
    } else if(cmd === `${prefix}vol` || cmd === `${prefix}volume`){
      if(!message.member.voiceChannel) return message.channel.send('You are not in a voice channel');
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      let volEmbed = new Discord.RichEmbed()
        .setTitle(`Volume`)
        .setAuthor(message.author.username)
        .addField('Current Volume', ` **${serverQueue.volume}**`)
        .addField('To Change The Volume', `*${prefix}vol [1-5]* or *${prefix}volume [1-5]`)
        .addField('Example:', `*${prefix}vol 3* or *${prefix}volume 3*`);

      if(!args[0])return message.channel.send(volEmbed);
      serverQueue.volume = args[0];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
      return message.channel.send(`I set the volume to: **${args[0]}**`);
    } else if (cmd === `${prefix}np`) {
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    } else if (cmd === `${prefix}q` || cmd === `${prefix}queue`) {
      if (!serverQueue) return message.channel.send('There is nothing playing.');
      let index = 0;
      let queueEmbed = new Discord.RichEmbed()
      .setTitle(`Playing ${serverQueue.songs[0].title}`)
      .addField(`**Queuing**:`, serverQueue.songs.map(song => `Queuing Number: **${++index} -** ${song.title}`).join('\n'));
      message.channel.send(queueEmbed);
    }
    else if (cmd === `${prefix}remove` || cmd === `${prefix}r`){
      let removeInfo = new Discord.RichEmbed()
        .setTitle(`~INVALID USAGE~`)
        .addField(`Correct Formatting`, `*${prefix}remove <Song Queuing number>* or *${prefix}r <Song Queuing number>*`)
        .addField(`Example`, `*${prefix}remove 3* or *${prefix}r 3*`);
      if(!args[0])return message.channel.send(removeInfo);
          let index = 0;
          let toSkip = args[0];
          toSkip = Math.min(toSkip, serverQueue.songs.length);

          // Skip.
          serverQueue.songs.splice(serverQueue.songs.indexOf(toSkip - 1), 1);
          message.channel.send(`Successfully removed song number ${toSkip} from the queueing list.`);
          let removeEmbed = new Discord.RichEmbed()
          .setTitle(`Playing ${serverQueue.songs[0].title}`)
          .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
          message.channel.send(removeEmbed);
    }
    else if (cmd === `${prefix}pa` || cmd === `${prefix}pause`) {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused the music for you!');
      }
      return message.channel.send('There is nothing playing.');
    } else if (cmd === `${prefix}re` || cmd === `${prefix}resume`) {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed the music for you!');
      }
      return message.channel.send('There is nothing playing.');
    }
    else if(cmd === `${prefix}radio`){
      let radioInfo = new Discord.RichEmbed()
      .setTitle(`~INVALID USAGE~`)
      .addField(`Correct Formatting:`, `${prefix}radio <station or genre>`)
      .addField(`Example`, `${prefix}radio JAM'N`)
      .addField(`Can't Find the right Station or genre?:`, `Go Here https://www.iheart.com/ to search what you want, make sure its in the playlist filter. when you find it come back to me and tell me what you want.`);
      if(!args[0])return message.channel.send(radioInfo);
      message.channel.send(`Searching on IHeart radio's playlist for ${args[0]}`);
      const voiceChannel = message.member.voiceChannel;
        var connection = await voiceChannel.join();
        const matches = await iheart.search(args[0]);
        const station = matches.stations[0];

        const url = await iheart.streamURL(station);
         const dispatcher = connection.playStream(url);
        console.log(url);
        //message.channel.send(`Now playing ${args[0]}`);
        message.channel.send(`Found a match.`);
        let radioEmbed = new Discord.RichEmbed()
        .setTitle(`Now Playing: ${args[0]}`)
        .addField(`Not the one you want?:`, `Go Here https://www.iheart.com/ to search what you want, make sure its in the playlist filter. when you find it come back to me and tell me what you want.`)
        .setFooter(`Requested by ${message.author.username}`);
        message.channel.send(radioEmbed);

      }
      if(cmd ===`${prefix}leave`){
      if(!message.member.voiceChannel) return message.channel.send('You are not in a voice channel');
          message.member.voiceChannel.leave();
          message.channel.send('successful left the voice channel.')
      }

     });
     async function handleVideo(video, message, voiceChannel, playlist = false) {
     	const serverQueue = queue.get(message.guild.id);
     	console.log(video);
     	const song = {
     		id: video.id,
     		title: Util.escapeMarkdown(video.title),
     		url: `https://www.youtube.com/watch?v=${video.id}`
     	};
     	if (!serverQueue) {
     		const queueConstruct = {
     			textChannel: message.channel,
     			voiceChannel: voiceChannel,
     			connection: null,
     			songs: [],
     			volume: 5,
     			playing: true
     		};
     		queue.set(message.guild.id, queueConstruct);

     		queueConstruct.songs.push(song);

     		try {
     			var connection = await voiceChannel.join();
     			queueConstruct.connection = connection;
     			play(message.guild, queueConstruct.songs[0]);
     		} catch (error) {
     			console.error(`I could not join the voice channel: ${error}`);
     			queue.delete(message.guild.id);
     			return message.channel.send(`I could not join the voice channel: ${error}`);
     		}
     	} else {
     		serverQueue.songs.push(song);
     		console.log(serverQueue.songs);
     		if (playlist) return undefined;
     		else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
     	}
     	return undefined;
     }
     function play(guild, song) {
     	const serverQueue = queue.get(guild.id);

     	if (!song) {
     		serverQueue.voiceChannel.leave();
     		queue.delete(guild.id);
     		return;
     	}
     	console.log(serverQueue.songs);

     	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
     		.on('end', reason => {
     			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
     			else console.log(reason);
           serverQueue.songs.shift();
     			play(guild, serverQueue.songs[0]);
     		})
     		.on('error', error => console.error(error));
         setTimeout(function(){
     	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
     	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
     }, 500);
   }
bot.login(botconfig.token);
