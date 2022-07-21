const { Client, Message, MessageEmbed } = require('discord.js');
const { ServerSettings } = require('../../Storage/DB/tables');

module.exports = {
    name: "server-settings",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let MyServer = await ServerSettings.get(`guild_${message.guild.id}`); 

        if (MyServer) {
            
            let LogChannelId = ServerSettings.get(`guild_${message.guild.id}.logchannel.channelId`); 

            let banLog = ServerSettings.get(`guild_${message.guild.id}.logchannel.banLog`);
            let unbanLog = ServerSettings.get(`guild_${message.guild.id}.logchannel.unbanLog`);
            let kickLog = ServerSettings.get(`guild_${message.guild.id}.logchannel.kickLog`);
            let clearLog = ServerSettings.get(`guild_${message.guild.id}.logchannel.clearLog`);
            let channelCreateLog = ServerSettings.get(`guild_${message.guild.id}.logchannel.channelCreateLog`);

            let enabled = "`🟢 ENABLED`"
            let disabled = "`🔴 DISABLED`"

            let bl; 
            let ubl; 
            let kl; 
            let cl; 
            let ccl; 

            if (banLog === true) {
                bl = enabled; 
            } else {
                bl = disabled
            };

            if (kickLog === true) {
                kl = enabled; 
            } else {
                kl = disabled
            };

            if (unbanLog === true) {
                ubl = enabled; 
            } else {
                ubl = disabled
            };

            if (clearLog === true) {
                cl = enabled; 
            } else {
                cl = disabled
            };

            if (channelCreateLog === true) {
                ccl = enabled; 
            } else {
                ccl = disabled
            };
            

            let response = new MessageEmbed({
                title: "Server Settings", 
                description: "Here is the list of server settings", 
                color: "BLURPLE",
                fields: [
                    {
                        name: "__Server Info__", 
                        value: `**Guild ID:** \`${message.guild.id}\` \n**Guild Name:** \`${message.guild.name}\` \n**Member Count:** \`${message.guild.memberCount}\``, 
                        inline: true, 
                    }, 
                    {
                        name: "__Log Channel__",
                        value: `**Ban Log:** \`${bl}\` \n**Unban Log:** \`${ubl}\` \n**Kick Log:** \`${kl}\` \n**Clear Log:** \`${cl}\` \n**Channel Create Log:** \`${ccl}\` \n`, 
                        inline: true
                    } 
                ]
            })

            message.channel.send({embeds: [response]})

        } else {
            return message.reply("Please set up your server. `!setup`")
        }

    }
}
