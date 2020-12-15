"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Picks an item from the drop array given the chance
Inputs: [input_array: array of drop objects]
Output: item_id: number
 */
var WeightedPick = function (input_array) {
    // I have no idea what type this actually is: change later tho :)
    var weight = [].concat.apply([], input_array.map(function (d) { return Array(Math.ceil(d.weight)).fill(d); }));
    return weight[Math.floor(Math.random() * weight.length)].item_id;
};
exports.default = WeightedPick;
