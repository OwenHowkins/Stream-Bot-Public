const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: "invite",
    cooldown: 120,
    aliases: ["inv"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        
        let invite = "https://discord.com/api/oauth2/authorize?client_id=998713248557846558&permissions=8&scope=bot%20applications.commands"
    
        const response = new MessageEmbed({
            title: "Invite me to your server!",
            description: `${invite}`, 
            color: "AQUA"
        })

        message.channel.send({embeds: [response]})

    }
}
