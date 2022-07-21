const { output } = require("better-output");
const Discord = require("discord.js"); 
const {
    Collection,
    Client,
    MessageEmbed
} = require("discord.js");

const client = new Client({
    intents: 32767, 
});
const cfg = require("./Storage/Botcfg.json");

// commands
client.commands = new Collection(); 
client.cooldowns = new Collection(); 

['Events', 'Commands'].forEach(file => {
    require(`./Handlers/${file}`)(client, Discord)
})

client.login(cfg.TOKEN); 