// require discord for obvious reasons
import { Client, Message } from 'discord.js';
// require configuration
const config = require('../config.json');
// service imports
const checkCommand = require('./services/check_command');
const checkCooldown = require('./services/check_cooldown');
// collection imports
import commands from './collections/commands';

// initialize important things
const client: Client = new Client();

// client listener for ready
client.once('ready', async () => {
  console.log('Ugip Ugip Lets Roll!');
});

// on message listener
client.on('message', async (message: Message) => {
  // if the message was by bot or isn't a command, exit
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  // parse the message string
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command: Command =
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
