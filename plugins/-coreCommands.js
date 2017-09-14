// This plugin in is nowhere completed, join out discord for update notifications!

module.exports = {
    // This plugin is the core commands for Fire Bot. We put them here so if users want to use other command plugins they can!
    loading: function () {
        console.debug('Loading Fire Bot Core Commands are loading.')
    },

    message: function (args, command, message) {
        if (command === "say") {
            const sayMessage = args.join(" ");
            message.react(client.commandPass)
            message.channel.send(sayMessage);
        }
        // This command updates the prefix in the Database
        if (command === "prefix") {
            if (args.length >= 2) {
                message.react(client.commandFail)
                message.client.send("Yeah I'm pretty sure that as a prefix would be hard for you to remember, wanna try again with something simpler?")
            } else {
                console.log(args)
                const newPrefix = args[0];
                client.fireconfig.update({
                    value: newPrefix,
                }, {
                        where: {
                            Setting: {
                                $eq: "Prefix"
                            }
                        }
                    })
                client.prefix = newPrefix
                message.channel.send("I have updated to prefix to " + newPrefix)
                message.react(clientInformation.commandPass)
            }
        }
        // This command updates the ignore bots option in the Database
        if (command === "ignorebots") {
            if (args.length >= 2) {
                message.react(client.commandFail)
                message.channel.send("Improper use of this command. Usage: " + client.prefix + "ignorebots [true/false]")
            } else {
                const newValue = args[0];
                client.fireconfig.update({
                    value: newValue,
                }, {
                        where: {
                            Setting: {
                                $eq: "IgnoreBots"
                            }
                        }
                    })
                client.config.IgnoreBots = newValue
                if (newValue == true)
                    message.channel.send("I have updated to prefix to " + newPrefix)
                message.react(client.commandPass)
            }
        }
        if (command === "ping") {
            if (args.length >= 1) {
                message.channel.send("Ummmmm.... Pong?")
            } else {
                message.channel.send("Pong!")
                message.react(client.commandPass)
            }
        }
        if (command === "info") {
            if (args.length >= 1) {
                message.channel.send("Try looking at " + client.prefix + "help, and try again...")
            } else {
                message.channel.send("I'm firebot V1.0 bitched!!! | Check me out at www.firebot.online!")
                message.react(client.commandPass)
            }
        }
        if (command === "help") {
            for (i = 0; i < client.pluginHelp.length; i++) {
                message.channel.send(client.pluginHelp[i])
            }
            message.react(client.commandPass)
        }
    },
    help: {
        embed: {
            color: 16711680,
            author: {
                name: "Fire Bot Alpha V1.0",
                icon_url: 'http://i.imgur.com/aDiphof.png'
            },
            title: "Commands",
            description: "Below lists all of my commands, if some don't work for you make sure you have permissions to actually use them!",
            fields: [{
                name: "Say",
                value: "Say allows you to make me speak for you! | Say [What should I say?]"
            },
            {
                name: "Ping",
                value: "You say Ping and I say Pong!"
            },
            {
                name: "Info",
                value: "I'll tell you what version of Firebot this discord is running, and where you can download Firebot for yourself!"
            },
            {
                name: "Prefix",
                value: "You can customize the command prefix with this command! | Prefix [new prefix]"
            }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: 'http://i.imgur.com/aDiphof.png',
                text: "© Firebot"
            }
        }

    }
};