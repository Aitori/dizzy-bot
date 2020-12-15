"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var cooldowns = new discord_js_1.Collection();
var checkCooldown = function (command, message) {
    // if cooldown dictionary doesn't exist
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new discord_js_1.Collection());
    }
    // set up cooldown variables
    var now = Date.now();
    var defaultCooldown = 0;
    var timestamps = cooldowns.get(command.name);
    var cooldownAmount = (command.cooldown || defaultCooldown) * 1000;
    // cooldown logic
    if (timestamps.has(message.author.id)) {
        var expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            var timeLeft = (expirationTime - now) / 1000;
            return timeLeft;
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(function () { return timestamps.delete(message.author.id); }, cooldownAmount);
    return null;
};
exports.default = checkCooldown;
