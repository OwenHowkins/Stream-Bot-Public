const { Client, Presence, Message } = require("discord.js");
const color = require("colors"); 
const { generate } = require("better-output");

module.exports = {
    name: "ready", 
    once: true, 
    /**
     * @param {Client} client
     * @param {Message} message
     */
    execute(message, client, Discord) {
        console.log(color.yellow("[Information]" + color.blue(" Client is online!")))

        client.user.setActivity({
            name: "| Currently in Development", 
            type: "PLAYING", 
            url: "https://discord.com/api/oauth2/authorize?client_id=998713248557846558&permissions=8&scope=applications.commands%20bot"
        })

        
    }
}