module.exports = async (client, message, args, argsF) => {
    if (args.length !== 4) {
        message.reply({
            embeds: [
                {
                    title: 'Incorrect number of teams!',
                    color: 'RED'
                }
            ]
        })
    } else {
        shuffle(argsF)
        message.channel.send({
            embeds: [
                {
                    title: `OG: ${argsF[0]}\nOO: ${argsF[1]}\nCG: ${argsF[2]}\nCO: ${argsF[3]}`,
                    color: 'GREEN'
                }
            ]
        })
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports.names = ['раунд', 'round']