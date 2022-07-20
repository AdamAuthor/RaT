module.exports = (client) => {
    client
        .on('ready', () => require('./ready')(client))
        .on('messageCreate', (message) => require('./messageCreate')(client, message))
}