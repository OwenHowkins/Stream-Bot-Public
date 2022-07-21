const {Client, Message} = require('discord.js');

module.exports = {
    name: "clear",
    cooldown: 10,
    permissions: "MANAGE_MESSAGES",
    aliases: ["purge"],
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        
        const amount = args[0]; 
        
        if (!amount) return message.reply("Please enter an amount of messages to delete."); 
        if (isNaN(amount)) return message.reply("Please enter a valid number of messages to delete.");
        
        if (amount > 100) return message.reply("Please enter a number lower than or equal to 100 messages.");
        if (amount < 1) return message.reply("You need to delete at least one message.")

        try {
            await message.channel.bulkDelete(amount)
        } catch (err) {
            console.log(err);
            message.reply("I can only delete messages up to 14 days old. Any more and I cannot delete them.")
        }

    }
}
