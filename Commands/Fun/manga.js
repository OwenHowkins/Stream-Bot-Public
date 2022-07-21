const { Client, Message, MessageEmbed } = require('discord.js');
const K = require("kitsu.js");
const kitsu = new K;

module.exports = {
    name: "manga",
    cooldown: 60,
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let search = args.slice(0).join(" ");
        if (!search) return message.reply("Please enter an manga title.");

        try {
            kitsu.searchManga(search).then(async result => {
                if (result.length === 0) {
                    return message.reply("I couldn't find the manga you are looking for!");
                }

                var manga = result[0];

                const response = new MessageEmbed()
                    .setTitle(`${manga.titles.english || " "} | ${manga.titles.japanese}`)
                    .setDescription(`${manga.synopsis}`)
                    .setColor("#ffffff")
                    .setThumbnail(`${manga.posterImage.original}`)
                    .addFields([
                        {
                            name: "No. of Volumes", 
                            value: `\`\`\`${manga.volumeCount || "No Data"}\`\`\``, 
                            inline: true
                        },
                        {
                            name: "No. of Chapters", 
                            value: `\`\`\`${manga.chapterCount || "No Data"}\`\`\``, 
                            inline: true
                        },
                        {
                            name: "Average Rating", 
                            value: `\`\`\`${manga.averageRating || "No Data"}\`\`\``, 
                            inline: true
                        },
                        {
                            name: "Age Rating", 
                            value: `\`\`\`${manga.ageRating || "No Data"}\`\`\``, 
                            inline: true
                        },
                        {
                            name: "Start Date", 
                            value: `\`\`\`${manga.startDate || "No Data"}\`\`\``, 
                            inline: true
                        },
                        {
                            name: "End Date", 
                            value: `\`\`\`${manga.endDate || "No Data"}\`\`\``, 
                            inline: true
                        },
                    ])

                message.channel.send({ embeds: [response] });
            })
        } catch (err) {
            console.log(err)
        }

    }
}
