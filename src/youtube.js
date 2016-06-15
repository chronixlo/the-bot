var cfg = require('./cfg.json');
var request = require('request');

function youtube(args, callback) {
    request('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=' + cfg.youtube_key + '&q=' + encodeURI(args), function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback('error');
        }
        
        body = JSON.parse(body);
        
        if (body.items[0]) {
            callback('https://youtu.be/' + body.items[0].id.videoId);
            return;
        }
        
        callback('not found');
    });
}

module.exports = youtube;