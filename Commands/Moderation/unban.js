const { date } = require('better-output');
const {Client, Message, MessageEmbed} = require('discord.js');
const { ModLog } = require("../../Storage/DB/tables");

module.exports = {
    name: "unban",
    permissions: "BAN_MEMBERS",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        const id = args[0];
        if (!id) return message.reply("You need to provide a user id for me to unban them.")
        if (isNaN(id)) return message.reply("You need to state a valid user id!");

        const bannedUsers = await message.guild.bans.fetch();
        const user = bannedUsers.get(id).user;
        if (!user) return message.reply("I was unable to find that user, please try another user or id."); 

        const reason = args.slice(1).join(" ") || "No reason given.";
        
        await message.guild.members.unban(user, reason); 
        const response = new MessageEmbed({
            title: `Unbanned ${user.username}`, 
            description: `Successfully unbanned ${user}.\nCheck the logs for more information`,
            color: "GREEN"
        })
        message.channel.send({embeds: [response]}); 

        let logid = await ModLog.get(`guild_${message.guild.id}`);
        const logChannel = message.guild.channels.cache.get(logid);
        if (!logid) return;

        const logEmbed = new MessageEmbed({
            title: "Mod Log | Unban",
            description: `${user} has been unbanned from the server.`,
            color: "GREEN",
            footer: `${date.now()}`,
            fields: [
                {
                    name: "Username",
                    value: `\`\`\`${user.username}\`\`\``,
                    inline: true
                },
                {
                    name: "User ID",
                    value: `\`\`\`${user.id}\`\`\``,
                    inline: true
                },
                {
                    name: "Discriminator",
                    value: `\`\`\`#${user.discriminator}\`\`\``,
                    inline: true
                },
                {
                    name: "Reason",
                    value: `\`\`\`${reason}\`\`\``, 
                    inline: true
                }, 
            ],
            thumbnail: {
                url: `${user.displayAvatarURL({ dynamic: true })}`
            }
        })

        logChannel.send({ embeds: [logEmbed] })
        
    }
}
