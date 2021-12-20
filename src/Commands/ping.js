const Command = require('../Structures/Command.js');

module.exports = new Command({
    name: 'ping',
    description: 'Shows the ping of the bot',
    permission: 'SEND_MESSAGES',

    async execute(message, args, client) {
        message.channel.send('**Bot**:').then((result) => {
            const ping = result.createdTimestamp - message.createdTimestamp;

            result.edit(
                `**Bot**: ${ping}ms\n**Websocket**: ${client.ws.ping}ms 👽`
            );
        });
    },
});
