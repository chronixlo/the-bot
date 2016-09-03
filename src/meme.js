var cfg = require('./cfg.json');
var request = require('request');

function meme(args, callback) {
    args = args.split('"')
    .map(function (v) {
        return v.trim();
    })
    .filter(function (v) {
        return v;
    });
    
    if (args.length !== 3) {
        callback('meme usage: !meme memename "top text" "bottom text"');
        return;
    }
    
    request({
        url: 'https://api.imgflip.com/caption_image',
        method: 'post',
        body: {
            template_id: args[0],
            username: cfg.imgflip.user,
            password: cfg.imgflip.pass,
            text0: args[1],
            text1: args[2]
        },
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback('error');
            return;
        }
        
        if (body.success) {
            callback(body.data.url);
        } else {
            callback('no workings');
        }
    });
}

module.exports = meme;