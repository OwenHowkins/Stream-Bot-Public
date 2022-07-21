const { QuickDB } = require("quick.db");

const db = new QuickDB;

const ServerSettings = db.table("ServerSettings"); 
const ModLog = db.table("ModLog");

module.exports = {
    ServerSettings, 
    ModLog
}