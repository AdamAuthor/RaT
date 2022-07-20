const {Interaction} = require("discord.js");
module.exports = async (client, message, args, argsF) => {

    let timer = 435 // 7 minutes 15 secs
    let poiTimerOn = false
    let isPause = false

    const action = {
        type: 'ACTION_ROW',
        components: [
            {
                type: 'BUTTON',
                label: 'PAUSE',
                customId: 'pauseBtn',
                style: 'PRIMARY',
                emoji: '',
                url: null,
                disabled: false
            },

            {
                type: 'BUTTON',
                label: 'RESUME',
                customId: 'resumeBtn',
                style: 'PRIMARY',
                emoji: '',
                url: null,
                disabled: false
            },

            {
                type: 'BUTTON',
                label: 'STOP',
                customId: 'stopBtn',
                style: 'DANGER',
                emoji: '',
                url: null,
                disabled: false
            },
        ]
    }

    const poi = {
        type: 'ACTION_ROW',
        components: [
            {
                type: 'BUTTON',
                label: '-- POI --',
                customId: 'poiBtn',
                style: 'SUCCESS',
                emoji: '',
                url: null,
                disabled: false
            },
        ]
    }

    const startMsg = await message.reply({
        content: 'Timer start',
        embeds: [
            {
                title: 'TIMER START!',
                color: 'BLUE'
            }
        ],
        components: [action]
    })

    let startCollector = await startMsg.createMessageComponentCollector()

    startCollector.on('collect',  Interaction => {
        if (Interaction.customId === "pauseBtn") {
            isPause = true
            Interaction.reply("Timer has paused!")
        }

        if (Interaction.customId === "resumeBtn") {
            isPause = false
            Interaction.reply("Resume timer!")
        }

        if (Interaction.customId === "stopBtn") {
            Interaction.reply({
                embeds: [
                    {
                        title: `Timer has stopped!`,
                        color: 'RED'
                    }
                ]
            })
            clearInterval(timerID)
        }
    })

    let timerID = setInterval(async () => {
        if (timer === 375) {
            const oneMinute = await message.channel.send({
                content: "1 minute left!",
                embeds: [
                    {
                        title: 'TIME TO POI!',
                        color: 'BLUE'
                    }
                ],
                components: [action, poi]
            })

            let oneCollector = await oneMinute.createMessageComponentCollector()

            oneCollector.on('collect',  Interaction => {
                if (Interaction.customId === "pauseBtn") {
                    isPause = true
                    Interaction.reply("Timer has paused!")
                }

                if (Interaction.customId === "resumeBtn") {
                    isPause = false
                    Interaction.reply("Resume timer!")
                }

                if (Interaction.customId === "stopBtn") {
                    Interaction.reply({
                        embeds: [
                            {
                                title: `Timer has stopped!`,
                                color: 'RED'
                            }
                        ]
                    })
                    clearInterval(timerID)
                }

                if (Interaction.customId === "poiBtn") {
                    poiTimerOn = true
                    Interaction.reply({
                        embeds: [
                            {
                                title: `The POI is accepted. You have 15 seconds to ask a question`,
                                color: 'GREEN'
                            }
                        ]
                    })
                }
            })
        }

        if (timer === 75) {
            const sixMinute = await message.channel.send({
                content: "6 minute left!",
                embeds: [
                    {
                        title: 'STOP POI!',
                        color: 'DARK_BLUE'
                    }
                ],
                components: [action]
            })

            let sixCollector = await sixMinute.createMessageComponentCollector()

            sixCollector.on('collect',  Interaction => {
                if (Interaction.customId === "pauseBtn") {
                    isPause = true
                    Interaction.reply("Timer has paused!")
                }

                if (Interaction.customId === "resumeBtn") {
                    isPause = false
                    Interaction.reply("Resume timer!")
                }

                if (Interaction.customId === "stopBtn") {
                    Interaction.reply({
                        embeds: [
                            {
                                title: `Timer has stopped!`,
                                color: 'RED'
                            }
                        ]
                    })
                    clearInterval(timerID)
                }
            })
        }

        if (timer === 15) {
            message.channel.send({
                content: "7 minute left!",
                embeds: [
                    {
                        title: 'You have only 15 seconds left to complete your speech',
                        color: 'YELLOW'
                    }
                ],
            })
        }

        if (timer < 4 && timer > 0) {
            message.channel.send({
                embeds: [
                    {
                        title: `${timer}`,
                        color: 'RED'
                    }
                ]
            })
        }

        if (timer === 0) {
            message.channel.send({
                embeds: [
                    {
                        title: `STOP SPEECH!`,
                        color: 'DARK_RED'
                    }
                ]
            })
            clearInterval(timerID)

        }

        if (!isPause) {
            timer--
        }

        if (poiTimerOn) {
            setTimeout(() => {
                message.channel.send({
                    embeds: [
                        {
                            title: `Time left!`,
                            color: 'GREEN'
                        }
                    ]
                })
            }, 1000 * 15)

            poiTimerOn = false
        }
    }, 1000)
}


module.exports.names = ['timer', 'таймер']