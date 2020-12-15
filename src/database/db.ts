import { drop_model, user_model } from '.';
import { Drop, Item } from '../types';
import { item_model } from './schema/item';

/* User Helper Functions
========================
*/
const getUserDatabase = async (uid: string) => {
  let user = await user_model.findOne({ id: uid });
  if (user) {
    return user;
  } else {
    user = new user_model({
      id: uid
    });
    await user.save().catch((error) => console.log(error));
    return user;
  }
};

/* Item Helper Functions 
========================
*/
/* Create Item */
const create_item = async (item_id: number, name: string, imageUrl: string, cost: number) => {
  const new_item = new item_model({
    item_id: item_id,
    name: name,
    imageUrl: imageUrl,
    cost: cost
  });
  new_item.save((error) => {
    if (error) return console.error(error);
  });
};

/* Get Item */
const get_item = async (item_id: number): Promise<Item> => {
  const item = await item_model.find({ item_id: item_id });
  return item[0];
};
/* Drop Helper Functions
========================
*/
/* Create Drop */
const create_drop = async (item_id: number, weight: number, gacha: string) => {
  const new_drop = new drop_model({
    item_id: item_id,
    weight: weight,
    gacha: gacha
  });
  new_drop.save((error) => {
    if (error) return console.error(error);
  });
};

/* Get drops based on gacha */
const get_drops_gacha = async (gacha: string): Promise<Drop[]> => {
  const all_documents = await drop_model.find({ gacha: gacha });
  return all_documents;
};
/* Inventory Helper Functions
========================
*/
export { getUserDatabase, create_item, create_drop, get_drops_gacha, get_item };
