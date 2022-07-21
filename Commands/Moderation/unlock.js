const {Client, Message, Channel,MessageEmbed} = require('discord.js');
const { ModLog } = require("../../Storage/DB/tables");
const { date } = require('better-output');

module.exports = {
    name: "unlock",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 
        if (!args[0]) channel = message.channel; 

        if (channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === true) {
            return message.channel.send("Channel is already unlocked.");
        }

        let logid = await ModLog.get(`guild_${message.guild.id}`);
        const logChannel = message.guild.channels.cache.get(logid);
        if (!logid) return;

        const logEmbed = new MessageEmbed({
            title: "Mod Log | Unlock Channel",
            description: `${channel} has been unlocked`,
            color: "GREEN",
            footer: `${date.now()}`,
            fields: [
                {
                    name: "Channel",
                    value: `${channel}`,
                    inline: true
                },
                {
                    name: "Channel ID",
                    value: `\`\`\`${channel.id}\`\`\``,
                    inline: true
                }, 
                {
                    name: "Channel Description/topic",
                    value: `\`\`\`${channel.topic || "Nothing"}\`\`\``,
                    inline: true 
                }
            ]
        })

        try {

            const role = message.guild.roles.cache.find(r => r.name === '@everyone');

            channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: true
            })

            message.channel.send(`Unlocked ${channel} successfully`)

            logChannel.send({embeds: [logEmbed]});

        } catch (err) {
            console.log(err)
        }

    }
}
