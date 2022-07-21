const { date } = require('better-output');
const { Client, Message, MessageEmbed } = require('discord.js');
const { ModLog } = require("../../Storage/DB/tables");

module.exports = {
    name: "kick",
    permissions: "KICK_MEMBERS",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        const user = message.mentions.members.first();
        let reason = args.slice(1).join(" ") || "No reason given.";

        if (!args[0]) return message.reply("You need to provide a member for me to kick.")
        if (!user) return message.reply("I am unable to find the member you are looking for.")
        if (!user.kickable) message.reply("I am unable to kick that member, please try someone else.");

        const response = new MessageEmbed({
            description: `Sucessfully Kicked ${user} for \`${reason}\``,
            color: "GREEN"
        });

        let logid = await ModLog.get(`guild_${message.guild.id}`);
        const logChannel = message.guild.channels.cache.get(logid);
        if (!logid) return;

        const logEmbed = new MessageEmbed({
            title: "Mod Log | Kick",
            description: `${user} has been kicked from the server.`,
            color: "GREEN",
            footer: `${date.now()}`,
            fields: [
                {
                    name: "Username",
                    value: `\`\`\`${user.user.username}\`\`\``,
                    inline: true
                },
                {
                    name: "User ID",
                    value: `\`\`\`${user.user.id}\`\`\``,
                    inline: true
                },
                {
                    name: "Discriminator",
                    value: `\`\`\`#${user.user.discriminator}\`\`\``,
                    inline: true
                },
                {
                    name: "Reason",
                    value: `\`\`\`${reason}\`\`\``, 
                    inline: true
                }, 
            ],
            thumbnail: {
                url: `${user.user.displayAvatarURL({ dynamic: true })}`
            }
        })

        try {
            user.kick()

            logChannel.send({embeds: [logEmbed]})

            message.reply({ content: "full details have been put in the logs.", embeds: [response] })
        } catch (err) {
            console.log(err)
        }
    }
}
