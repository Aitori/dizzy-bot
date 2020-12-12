import { Message } from 'discord.js';
import { itemModel } from '../database';

module.exports = {
  name: 'create_item',
  description: 'Creates an item.',
  aliases: ['ci'],
  usage: '[ci item_id item_name imageUrl cost]',
  roles: '[Admin]',
  execute(message: Message, args: string[]) {
    // args: [item_id item_name imageUrl cost]
    if (args.length !== 4) {
      message.reply(
        'Wrong number of arguments. Should be 4 for [ci item_id item_name imageUrl cost]'
      );
      return;
    }
    const cost = parseFloat(args[3]);
    const new_item = new itemModel({
      item_id: args[0],
      name: args[1],
      description: "Default Description",
      imageUrl: args[2],
      cost: cost
    });
    new_item.save((error) => {
      if (error) return console.error(error);
    });
  }
};
