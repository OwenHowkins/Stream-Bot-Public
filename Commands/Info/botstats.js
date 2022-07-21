const {Client, Message, MessageEmbed, Shard} = require('discord.js');

module.exports = {
    name: "stats",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        const shardCount = client.shard.count;
        let serverCount; 

        await client.shard.fetchClientValues('guilds.cache.size')
        .then(results => {
            serverCount = results.reduce((acc, guildCount) => acc + guildCount, 0); 
        })
        .catch(console.error)


        const stats = new MessageEmbed()
            .setTitle("Bot Stats")
            .setColor("AQUA")
            .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
            .setDescription(`**Status:** \`🟢 Online\` \n**Uptime:** <t:${parseInt(client.readyTimestamp / 1000)}:R>`)
            .addFields([
                {
                    name: "Shard Count", 
                    value: `\`\`\`${shardCount}\`\`\``,
                    inline: true
                }, 
                {
                    name: "Server Count", 
                    value: `\`\`\`${serverCount}\`\`\``, 
                    inline: true
                }
            ])
        
            message.channel.send({embeds: [stats]})

    }
}
