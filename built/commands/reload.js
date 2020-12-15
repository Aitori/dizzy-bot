"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = __importDefault(require("../collections/commands"));
module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    roles: ['Admin'],
    execute: function (message, args) {
        var commandName = args[0].toLowerCase();
        var command = commands_1.default.get(commandName) ||
            commands_1.default.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName); });
        if (!command) {
            return message.channel.send("There is no command with name or alias `" + commandName + "`, " + message.author + "!");
        }
        delete require.cache[require.resolve("./" + command.name + ".js")];
        try {
            var newCommand = require("./" + command.name + ".js");
            commands_1.default.set(newCommand.name, newCommand);
            message.channel.send("Command `" + command.name + "` was reloaded!");
        }
        catch (error) {
            console.log(error);
            message.channel.send("There was an error while reloading a command `" + command.name + "`:\n`" + error.message + "`");
        }
    }
};
