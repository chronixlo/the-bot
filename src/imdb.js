var request = require('request');

function imdb(args, callback) {
    request('http://www.omdbapi.com/?t=' + encodeURI(args) + '&plot=short&r=json', function (error, response, body) {
        if (error || response.statusCode !== 200) {
            callback('error');
        }
        
        body = JSON.parse(body);
        
        if (body.Response === 'True') {
            callback(
                [
                    body.Poster,
                    body.Title + ' (' + body.Year + ')',
                    'Adjusted: ' + calculateAdjusted(body.imdbRating, parseInt(body.Year, 10)),
                    'IMDB: ' + body.imdbRating,
                    'Metascore: ' + body.Metascore
                ].join('\n')
            );
            
            return;
        }
        
        callback('not found');
    });
}

function calculateAdjusted(score, year) {
    return (score * Math.pow(Math.E, -Math.pow((new Date().getFullYear() - year)/40, 2))).toFixed(1);
}

module.exports = imdb;