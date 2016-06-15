var cfg = require('./cfg.json');
var parser = require('./parser.js');
var commands = require('./commands.js');
var Discord = require('discord.js');
var request = require('request');

var bot = new Discord.Client({
    autoReconnect: true
});

bot.on('ready', function () {
    console.log('[' + (new Date()).toISOString() + '] started');
});

bot.on('message', function (message) {
    if (message.author.id === bot.user.id) {
        return;
    }
    
    var input = parser.parse(message.content);
    
    if (!input) {
        return;
    }
    
    if (commands[input.command]) {
        commands[input.command](input.args, function (response) {
            bot.reply(message, response);
        });
    }
});

bot.loginWithToken(cfg.discord_token);