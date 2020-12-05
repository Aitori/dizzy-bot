'use strict';
// require discord for obvious reasons
const Discord = require('discord.js');
// require configuration
const config = require('./config.json');
// service imports
const checkCommand = require('./services/check_command');
const checkCooldown = require('./services/check_cooldown');
// collection imports
const commands = require('./collections/commands');

// initialize important things
const client = new Discord.Client();

// client listener for ready
client.once('ready', async () => {
  console.log('Ugip Ugip Lets Roll!');
});

// on message listener
client.on('message', async (message) => {
  // if the message was by bot or isn't a command, exit
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  // parse the message string
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    commands.get(commandName) ||
    commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  // check if command is valid
  const commandValid = checkCommand(command, message, args, config.prefix);
  if (commandValid != null) {
    message.reply(commandValid);
    return;
  }

  // check for cooldown of command
  const timeLeft = checkCooldown(command, message);
  if (timeLeft != null) {
    message.reply(
      `Please wait ${timeLeft.toFixed(1)} before trying the \`${command.name}\` command.`
    );
  }

  // execute command!
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Oops, something went wrong! Check error logs.');
  }
});

client.login(config.token);
