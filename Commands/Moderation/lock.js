const {Client, Message, Channel,MessageEmbed} = require('discord.js');
const { ModLog } = require("../../Storage/DB/tables");
const { date } = require('better-output');

module.exports = {
    name: "lock",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 
        if (!args[0]) channel = message.channel; 

        if (channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) {
            return message.channel.send("Channel is already locked.");
        }


        let logid = await ModLog.get(`guild_${message.guild.id}`);
        const logChannel = message.guild.channels.cache.get(logid);
        if (!logid) return;

        const logEmbed = new MessageEmbed({
            title: "Mod Log | Lock Channel",
            description: `${channel} has been locked`,
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
                SEND_MESSAGES: false
            })

            logChannel.send({embeds: [logEmbed]});
            message.channel.send(`Locked ${channel} successfully`)

        } catch (err) {
            console.log(err)
        }

    }
}
