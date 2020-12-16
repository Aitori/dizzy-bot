import { Message } from 'discord.js';
import { Item } from '../types';

const send_item_embed = async (message: Message, item: Item) => {
  const embed = {
    title: item.name,
    color: 937505,
    image: {
      url: item.imageUrl,
      author: {
        name: message.author.username,
        iconURL: message.author.avatarURL()
      }
    }
  };

  const mes = await message.channel.send({ embed: embed });
  return mes;
};

export { send_item_embed };
