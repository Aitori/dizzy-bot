module.exports = {
  name: 'jab',
  description: 'Jab the world boss for 1 dmg',
  guildOnly: true,
  execute(message) {
    message.channel.send(`Jabbed!`);
  },
};