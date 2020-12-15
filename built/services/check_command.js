"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkCommand = function (command, message, args, prefix) {
    if (!command)
        return 'Command not found!';
    // if the command is server only and is text, exit
    if (command.guildOnly && message.channel.type !== 'text') {
        return "Can't use this here...";
    }
    // check for validity in roles
    if (command.guildOnly &&
        command.roles &&
        command.roles.filter(function (role) {
            var found = false;
            message.member.roles.cache.forEach(function (v) {
                if (v.name == role)
                    found = true;
            });
            return found;
        }).length === 0) {
        return "Can't use `" + command.name + "` no permissions!";
    }
    return null;
};
exports.default = checkCommand;
