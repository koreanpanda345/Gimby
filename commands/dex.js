const Discord = require('discord.js');
const superagent = require('superagent');
const oakdexPokedex = require('oakdex-pokedex');
const pokemonGif = require('pokemon-gif')
    let pokemon = require('C:\\Users\\korea\\source\\repos\\ConsoleApplication1\\discord\\other_bots\\Badge_Bot\\json_files\\pokemon.json')
module.exports.run = async(bot, message, args) =>{
let pokemon = args[0];
let infoEmbed = new Discord.RichEmbed()
.setTitle('~INVALID USAGE~')
.setColor(0xf44242)
.addField('Correct Usage', 'bad!dex <pokemon name(Note: You need to capitalize the first letter of the name)>')
.addField('Example', 'bad!dex Milotic');
if(!pokemon) return message.channel.send(infoEmbed);
if(pokemon === "Nidoran👧"){
    pokemon = "Nidoran♀"
}
if(pokemon === "Nidoran👦"){
    pokemon = "Nidoran♂"
}
let eevee = oakdexPokedex.findPokemon(pokemon);
console.log(eevee);
eevee = {
     name: pokemon,
    evolution_from: eevee.evolution_from,
    base_stats: eevee.base_stats,
    types: eevee.types,
    categories: eevee.categories,
    national_id: eevee.national_id,
    mega_evolutions: eevee.mega_evolution,
    evolutions: eevee.evolutions,
    leveling_rate: eevee.leveling_rate,
    height_us: eevee.height_us,
    weight_us: eevee.weight_us,
    abilities: eevee.abilities,
    name: eevee.abilities.name,
    hidden: eevee.abilities.hidden,
    pokedex_entries: eevee.pokedex_entries,
    Moon: eevee.pokedex_entries.Moon
}

if(eevee.name === "Nidoran♀"){
    pokemon = "Nidoran"
}
if(eevee.name === "Nidoran♂"){
    pokemon = "Nidoran"
}
let evolvesFrom = eevee.evolution_from;
let type = eevee.types;
console.log(type.join(' '));
let abilities;
console.log(eevee.abilities[0].name);
abilities = `${eevee.abilities[0].name}`;
if(eevee.abilities[1]){
    if(eevee.abilities[1].hidden === true){
    console.log(eevee.abilities[1].name + ", This is an Hidden Ability");
    abilities = `${eevee.abilities[0].name}\nHidden Ability: ${eevee.abilities[1].name}`;
}
    else{
    console.log(eevee.abilities[1].name);
    abilities = `${eevee.abilities[0].name}, ${eevee.abilities[1].name}`;
    }
}
if(eevee.abilities[2]){
    if(eevee.abilities[2].hidden === true){
    console.log(eevee.abilities[2].name + ", This is an Hidden Ability");
    abilities = `${eevee.abilities[0].name}\n${eevee.abilities[1].name}\nHidden Ability: ${eevee.abilities[2].name}`
    }
    else{
    console.log(eevee.abilities[2].name);
    }
}
if(eevee.evolution_from === null){
    evolvesFrom === "NaN"
}
let imageEmbed = new Discord.RichEmbed()
.setTitle(`Info on ${pokemon}`)
.setImage(pokemonGif(pokemon));
let embed = new Discord.RichEmbed()
.addField('Known As: ', eevee.categories['en'])
.setDescription(eevee.pokedex_entries.Y['en'])
.addField('National Pokedex No.', eevee.national_id)
.addField('Type', type.join(" "))
.addField('Abilities: ', abilities)
.addField('Height', eevee.height_us, true)
.addField('Weight', eevee.weight_us, true)
.addField('Base Stats', `HP: ${eevee.base_stats["hp"]}\nAtk: ${eevee.base_stats["atk"]}\nDef: ${eevee.base_stats["def"]}\nSp.Atk: ${eevee.base_stats["sp_atk"]}\nSp.Def: ${eevee.base_stats["sp_def"]}\nSpeed: ${eevee.base_stats["speed"]}`)
.addField('Leveling Rate', eevee.leveling_rate)
.addField('Evolves From', evolvesFrom);

/**
 * EDITS
 * -Make the Base stats to be a single file line.(change true to false for the inline)
 * -Change"Evolve" to "Evolves from" and "Evolution".(Change the titles for them)
 * -Change "ID"to "National Pokedex No."(Change the Title)
 * -Adding in the Footprint(Side Project)
 * -
 */


message.channel.send(imageEmbed);
message.channel.send(embed);

}
module.exports.help = {
    name:"dex"
};