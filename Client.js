const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.login(process.env.TOKEN)

require('./events/index')(client)

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands')

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    command.names.forEach(el => {
        client.commands.set(el, command)
    })
}

console.log(client.commands)