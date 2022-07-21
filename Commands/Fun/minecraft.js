const {Client, Message, MessageEmbed} = require('discord.js');
const minecraftPlayer = require("minecraft-player");

module.exports = {
    name: "player",
    permissions: "ADMINISTRATOR",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        let usernameDC = args[0]; 
        if (!usernameDC) return; 

        const { uuid, createdAt, username } = await minecraftPlayer(usernameDC);

        let names = []; 

        let nameHistory = (await minecraftPlayer(usernameDC)).usernameHistory.forEach(n => {
            names.push(`${n.username} | ${n.changedAt || "Original"}`); 
        }) 

        const embed = new MessageEmbed()
        .setTitle(`${username} requested by ${message.author.tag}`)
        .setColor("WHITE")
        .setImage(`https://mineskin.eu/armor/body/${usernameDC}/100.png`)
        .setThumbnail(`https://mineskin.eu/headhelm/${usernameDC}/100.png`)
        .setDescription(``)
        .addField(`<:tortuga:983694715507572806> | **UUID**`, `\`\`\`${uuid}\`\`\``, true)
        .addField(`<:tortuga:983694715507572806> | **Created at**`, `\`\`\`${createdAt}\`\`\``, true)
        .addField(`<:tortuga:983694715507572806> | **Username History**`, `\`\`\`${names.join('\n')}\`\`\``, false)
        .setFooter({text: "Original Code: Azztur#0001 | Fixed and improved code: Ceptive#5200"})

        message.channel.send({embeds: [embed]})
    }
}
