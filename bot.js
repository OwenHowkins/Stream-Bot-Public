const { ShardingManager } = require("discord.js");
const cfg = require("./Storage/Botcfg.json"); 
const color = require("colors")

const manager = new ShardingManager('./main.js', {
    totalShards: "auto", 
    shardList: "auto", 
    token: cfg.TOKEN
})

manager.on("shardCreate", async (shard) => {
    console.log(color.cyan("[Information]" + color.blue(` ${new Date()} | Spawned ${shard.id}`)))
})

manager.spawn()