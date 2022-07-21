const { Client, Message } = require('discord.js');
const { ServerSettings, Warnings } = require("../../Storage/DB/tables");

module.exports = {
    name: "setup",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        const MyServer = await ServerSettings.get(`guild_${message.guild.id}`);

        try {

            if (!MyServer) {

                await ServerSettings.set(`guild_${message.guild.id}`, {
                    logchannel: {
                        banLog: false,
                        unbanLog: false,
                        kickLog: false,
                        clearLog: false,
                        channelCreateLog: false,
                    }
                })

                message.reply("Successfully set up server settings and warning systems. `!server-settings`")

            } else {

                return message.reply("You already have server settings set up in this server. \`!server-settings\`")

            }

        } catch (err) {
            console.log(err)
        }

    }
}
