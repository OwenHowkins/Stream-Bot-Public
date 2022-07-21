const { output } = require("better-output");
const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const cfg = require("../../Storage/Botcfg.json");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    execute(message, client, Discord) {

        if (!message.content.startsWith(cfg.PREFIX) || message.author.bot) return;

        const args = message.content.slice(cfg.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                const NoPerms = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You do not have permissions to use this command.\n**Missing Permission:** \`${command.permissions}\``);
                return message.reply({ embeds: [NoPerms] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete();
                        }, 7500);
                    })
            }
        }

        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;

                const timeLeftEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Please wait another ${timeLeft.toFixed(1)} seconds before using this command again.`)

                return message.reply({ embeds: [timeLeftEmbed] })
                    .then((sent) => {
                        setTimeout(() => {
                            sent.delete()
                        }, 7500);
                    });
            };
        };

        timestamps.set(message.author.id, now);
        setTimeout(() => {
            timestamps.delete(message.author.id)
        }, cooldownAmount);

        try {
            command.execute(message, args, commandName, client, Discord); 
        } catch (err) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription("An error has occured here is the error!")
            .addField("Error:", `\`\`\`${err}\`\`\``, true)
            message.reply({embeds: [errorEmbed]});
            return output.error(err)
        }

    }
}