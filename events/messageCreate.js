module.exports = (client, message) => {
    if (message.author.bot) return;
    const {content} = message
    const
        messageArray = content.toLowerCase().split(' '),
        command = messageArray[0],
        args = messageArray.slice(1),
        messageArrayFull = content.split(' '),
        argsF = messageArrayFull.slice(1),
        commandRun = client.commands.get(command);

    if (commandRun) commandRun(client, message, args, argsF).catch(err => console.error(err))

}