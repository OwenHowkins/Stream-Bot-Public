const { Client, Message, MessageEmbed } = require('discord.js');
const K = require("kitsu.js");
const kitsu = new K;

module.exports = {
    name: "anime",
    cooldown: 60,
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {

        let search = args.slice(0).join(" ");
        if (!search) return message.reply("Please enter an anime title.");

        try {
            kitsu.searchAnime(search).then(async result => {
                if (result.length === 0) {
                    return message.reply("I couldn't find the anime you are looking for!");
                }

                var anime = result[0];

                const seriesLength = (anime.episodeLength * anime.episodeCount) /  60; 

                const response = new MessageEmbed()
                    .setTitle(`${anime.titles.english || " "} | ${anime.titles.japanese}`)
                    .setDescription(`${anime.synopsis}`)
                    .setColor("#ffffff")
                    .setThumbnail(`${anime.posterImage.original}`)
                    .addFields([
                        {
                            name: "Show Type",
                            value: `\`\`\`${anime.showType}\`\`\``,
                            inline: true
                        },
                        {
                            name: "No. of Episodes",
                            value: `\`\`\`${anime.episodeCount}\`\`\``,
                            inline: true
                        },
                        {
                            name: "Episode Length",
                            value: `\`\`\`${anime.episodeLength}mins\`\`\`` || `Unknown`,
                            inline: true
                        },
                        {
                            name: "Series Length", 
                            value: `\`\`\`${seriesLength.toFixed(1)} Hours\`\`\``, 
                            inline: true
                        }, 
                        {
                            name: "Average Rating",
                            value: `\`\`\`${anime.averageRating}/100\`\`\``,
                            inline: true
                        },
                        {
                            name: "Age Rating",
                            value: `\`\`\`${anime.ageRating}\`\`\``
                        },
                        {
                            name: "Show Start Date",
                            value: `\`\`\`${anime.startDate}\`\`\``,
                            inline: true
                        },
                        {
                            name: "Show End Date",
                            value: `\`\`\`${anime.endDate}\`\`\``,
                            inline: true
                        }
                    ])

                message.channel.send({ embeds: [response] });
            })
        } catch (err) {
            console.log(err)
        }

    }
}
