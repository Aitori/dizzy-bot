import { Message } from 'discord.js';
import { get_inventory, get_item } from '../database/db';
import { Command } from '../types';
import { Inventory } from '../types/core/inventory';

const command: Command = {
  name: 'inventory',
  description: 'Lists your inventory!',
  aliases: ['inv'],
  usage: '[inv]',
  guildOnly: true,
  async execute(message: Message) {
    const data = await get_inventory(message.author.id);
    const data_push = data.map(async (inv: Inventory) => {
      const item = await get_item(inv.item_id);
      return item.name + ": " + inv.count;
    });
    const output = await Promise.all(data_push);
    message.channel.send(output, { split: true });
  }
};

module.exports = command;
