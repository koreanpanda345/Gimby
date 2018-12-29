process.on('unhandledRejection', console.error);
//import files
const botconfig = require('C:/Users/korea/source/repos/ConsoleApplication1/discord/other bots/Badge_Bot/settings.json');
const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const bot = new Client({disableEveryone: true});
const fs = require('fs');
const iheart = require('iheart');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyATF9uLZcphTM0P2SwCRw4qMbgeX_KJmW4');
const queue = new Map();

//when it disconnects will first given a warning
bot.on('warn', console.warn);
//then gives the error in the console
bot.on('error', console.error);
//then returns a message saying that it has disconnected
bot.on('disconnect', () => console.log('I just disconnected'));
//then when it reconnects, it will say that it reconnected and was successful.
bot.on('reconnecting', () => console.log('I am reconnecting now!'));

//Command handler
//this is just here just in case we want more commands
bot.commands = new Discord.Collection();

const bot_controller = botconfig.bot_controller;
fs.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't Find Commands");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//when it runs and it was successful, it will run this
bot.on("ready", async () =>{
  console.log(`|-------------------------------------------|`);
  let prefix = botconfig.prefix;
//--------------------------
//let newCommands = true;
  let newCommands = false;
  console.log(`|         New Commands: ${newCommands}               `);
  console.log(`|-------------------------------------------|`);
//--------------------------
  //let being_work_on = true;
  let being_work_on = false;
  console.log(`|         Being work on: ${being_work_on}             `);
  console.log(`|-------------------------------------------|`);
//-------------------------
  //let adding = true;
  let adding = false;
  let being_added = "help";
  let section = "help";
  console.log(`|         Adding Commands: ${adding}            `);
  console.log(`|         Being added: ${being_added}                     `);
  console.log(`|         Section: ${section}                         `);
  console.log(`|-------------------------------------------|`);
//--------------------------
let newCommand = true;
//let newCommand = false;
  console.log(`|         newCommand: ${newCommand}`);
  console.log(`|         Just Added: ${being_added}`);
  console.log(`|         Section: ${section}`);
  console.log(`|-------------------------------------------|`)
//-------------------------
  //let update = true;
  let update = false;
  let updated = "";
  let updatedCommand = "";
  console.log(`|         Updated: ${update}                     `);
  console.log(`|         Update in: ${updated}                  `);
  console.log(`|         Updated Command: ${prefix}${updatedCommand}      `);
  console.log(`|-------------------------------------------|`)
//-------------------------

    if(update === true){
      bot.user.setActivity(`Update on ${updated}, check command ${prefix}${updatedCommand}`);//updated commands stats
      bot.user.setStatus("online")
      .then(console.log)
      .catch(console.error);
  } else if(adding === true){
    bot.user.setActivity(`Gimby is getting a new command: ${prefix}${being_added} to ${section}. Please wait, till you do not see this status.thank you.`, {type: `WATCHING`});
    bot.user.setStatus("dnd")
    .then(console.log)
    .catch(console.error);
  }else if(being_work_on === true){
    bot.user.setActivity(`Gimby is being worked on, please wait, till you don't not see this status. thank you`, {type: `WATCHING`});//being worked on status
    bot.user.setStatus("dnd")
    .then(console.log)
    .catch(console.error);
  }else if(newCommand === true){
    bot.user.setActivity(`Gimby has New Commands. check out ${section} in the help command and try out ${prefix}${being_added}!!!`, {type: `WATCHING`});
    bot.user.setStatus("online")
    .then(console.log)
    .catch(console.error);
  }
  else if(newCommands === true){
    bot.user.setActivity(`New Commands check ${prefix}help to see them.`, {type: `WATCHING`});//new commands stats
    bot.user.setStatus("online")
    .then(console.log)
    .catch(console.error);
  }
  else{
    bot.user.setActivity(`${prefix}help`, {type: `WATCHING`});//standard stats
    bot.user.setStatus("online")
    .then(console.log)
    .catch(console.error);
  }
  console.log(`I am ready`);
});
bot.on("guildMemberAdd", async member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'general');
      if (!channel) return;
      let welcomeEmbed = new Discord.RichEmbed()
      .setTitle(`Welcome New Member`)
      .setColor(0x43f47a)
      .setDescription(`Welcome to Pokefinium ${member} Please take a look at <#506646749239050246> and other areas of importance. Have fun and I hope you find a home here with us!`);
      channel.send(welcomeEmbed);
      //channel.send(`Welcome to Pokefinium ${member} Please take a look at <#506646749239050246> and other areas of importance. Have fun and I hope you find a home here with us!`)
});
//this is the message event, any command that is too short or can not be put in a separate file goes in here.
bot.on('message', async message =>{
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let prefix = `b!`;
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
      if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
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
      .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
      message.channel.send(queueEmbed);
    }
    else if (cmd === `${prefix}remove` || cmd === `${prefix}r`){
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
        // search for a station, pick the first match
        const matches = await iheart.search(args[0]);
        const station = matches.stations[0];

        // finally you can get the source stream URL which can
        // be requested over HTTP and fed into an audio decoder,
        // or whatever your application does with it…
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