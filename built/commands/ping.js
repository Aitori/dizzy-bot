module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    roles: ['Admin'],
    execute: function (message) {
        message.channel.send('Pong.');
    },
};
