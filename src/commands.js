var imdb = require('./imdb.js');
var reddit = require('./reddit.js');
var roll = require('./roll.js');
var youtube = require('./youtube.js');

var cmds = {
    commands: commandlist,
    i: imdb,
    imdb: imdb,
    r: reddit,
    reddit: reddit,
    roll: roll,
    yt: youtube,
    youtube: youtube
};

var list = Object.keys(cmds)
    .map(function (cmd) {
        return '!' + cmd;
    })
    .join(', ');

function commandlist(args, callback) {
    callback(list);
}

module.exports = cmds;