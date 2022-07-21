const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: "latency",
    cooldown: 10,
    aliases: ["ping"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let e;

        if (client.ws.ping <= 130) {
            e = "🟢";
        } else if (client.ws.ping <= 150) {
            e = "🟠";
        } else {
            e = "🔴";
        }

        const response = new MessageEmbed({
            description: `**Latency:** \`${e} ${client.ws.ping}ms\``, 
            color: "AQUA"
        })

        message.channel.send({embeds: [response]}); 
    }
}
