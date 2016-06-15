var parser = require('./src/parser.js');
var commands = require('./src/commands.js');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.prompt();

rl.on('line', function (line) {
    var input = parser.parse(line);
    
    if (input) {
        console.log(input);

        if (commands[input.command]) {
            commands[input.command](input.args, function (response) {
                console.log(response);
            });
        }
    }
    
    rl.prompt();
});