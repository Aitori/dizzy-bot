import { Message } from 'discord.js';
import { user_add_points } from '../database/db';
import { Command } from '../types';

const command: Command = {
  name: 'collect',
  description: 'Collects hourly wage from the corporations!',
  aliases: ['church', 'payday'],
  usage: '[collect]',
  cooldown: 3600,
  guildOnly: true,
  async execute(message: Message) {
    const points = Math.floor(Math.random() * 1000) + 1000;
    const success = await user_add_points(message.author.id, points);
    if (success != null) {
      message.reply(points + ' points added!');
    }
  }
};

module.exports = command;
