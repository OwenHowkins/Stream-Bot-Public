const {Client, Message} = require('discord.js');
const { ServerSettings, ModLog } = require('../../Storage/DB/tables');

module.exports = {
    name: "set-logchannel",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        let MyServer = await ServerSettings.get(`guild_${message.guild.id}`); 

        if (MyServer) {
            
            let logchannelid = await ModLog.get(`guild_${message.guild.id}`);
            let channelid = args[0];
            if (!channelid) return message.reply("You must state a channel id");
            if (isNaN(channelid)) return message.reply("The channel id must be a number"); 

            if (logchannelid === channelid) {
                return message.reply("You have already set that channel as a log channel!");
            } else {
                await ModLog.set(`guild_${message.guild.id}`, channelid); 
                message.reply(`Successfully set <#${channelid}> as a log channel.`);
            }
``
        } else {
            return message.reply("Please set up your server. `!setup`")
        }
    }
}
