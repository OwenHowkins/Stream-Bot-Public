const { readdirSync } = require("fs"); 

module.exports = (client, Discord) => {
    const commandFolders = readdirSync(`./Commands`);
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./Commands/${folder}`).filter(file => file.endsWith(".js")); 
        for (const file of commandFiles) {
            const command = require(`../Commands/${folder}/${file}`); 
            client.commands.set(command.name, command); 
        }
    }
}