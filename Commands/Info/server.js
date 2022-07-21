const {Client, Message, MessageEmbed, Guild} = require('discord.js');

module.exports = {
    name: "server",
    cooldown: 120,
    permissions: "ADMINISTRATOR", 
    aliases: ["guild-info", "myserver"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        const guild = message.guild;

        let icon = guild.iconURL() || "https://media.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif"

        const response = new MessageEmbed({
            title: `${guild.name} | Information`,
            description: `${guild.description || "Server does not have a discription about them"}`,
            color: "RANDOM", 
            thumbnail: {
                url: `${icon}`, 
            }, 
            fields: [
                {
                    name: "__GENERAL__", 
                    value: 
                    `
                    
                    - Name: ${guild.name}
                    - Created: <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                    - Owner: <@${guild.ownerId}>

                    - Description: ${guild.description || "Server has no description set."}
                    `
                }, 
                {
                    name: "__USERS__",
                    value: 
                    `
                    
                    - People: ${guild.members.cache.filter((m) => !m.user.bot).size}
                    - Bots: ${guild.members.cache.filter((m) => m.user.bot).size}
                    
                    - Total: ${guild.memberCount}
                    `
                }, 
                {
                    name: "__CHANNELS__", 
                    value: 
                    `
                    - Text: ${guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                    - Voice: ${guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                    
                    - Total: ${(guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size) + (guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size)}
                    `
                },
                {
                    name: "__THREADS__", 
                    value: 
                    `
                    - Public: ${guild.channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD").size}
                    - Private: ${guild.channels.cache.filter((c) => c.type === "GUILD_PRIVATE_THREAD").size}
                    - News: ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD").size}

                    - Total: ${(guild.channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD").size) + (guild.channels.cache.filter((c) => c.type === "GUILD_PRIVATE_THREAD").size) + (guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD").size)}
                    `
                }
            ]
        })

        const exampleEmbed = new MessageEmbed({
            title: "Example Embed", 
            description: "text here",
            timestamp: new Date(), 
            footer: "text here", 
            
        })

        message.channel.send({embeds: [response]});
        

    }
}
