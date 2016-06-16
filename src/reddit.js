var request = require('request');

function reddit(args, callback) {
    request({
        url: 'https://api.reddit.com/r/' + args + '/hot?limit=5',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'
        }
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback('error');
        }
        
        body = JSON.parse(body);
        
        if (body.data && body.data.children.length) {
            for (var i = 0, l = body.data.children.length; i < l; i++) {
                if (!body.data.children[i].data.stickied) {
                    callback('http://www.reddit.com' + body.data.children[i].data.permalink);
                    return;
                }
            }
            
            // return the first sticky if no non-stickies in the first 6(?) posts
            callback('http://www.reddit.com' + body.data.children[0].data.permalink);
            return;
        }
        
        callback('not found');
    });
}

module.exports = reddit;