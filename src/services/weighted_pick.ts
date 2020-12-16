import { Drop } from 'src/types';
/*
Picks an item from the drop array given the chance
Inputs: [input_array: array of drop objects]
Output: item_id: number
 */
const WeightedPick = (input_array: Array<Drop>): number => {
  // I have no idea what type this actually is: change later tho :)
  const weight = [].concat(...input_array.map((d: Drop) => Array(Math.ceil(d.weight)).fill(d)));
  return weight[Math.floor(Math.random() * weight.length)].tier;
};

export default WeightedPick;
