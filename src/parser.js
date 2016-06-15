function parse(input) {
    // first char has to be a '!'
    if (input.slice(0, 1) !== '!') {
        return;
    }
    
    var firstSpace = input.indexOf(' ');
    firstSpace = firstSpace === -1 ? input.length : firstSpace;
    
    var command = input.substr(1, firstSpace - 1);
    var args = input.substr(firstSpace + 1);
    
    return {
        command: command,
        args: args
    };
}

module.exports = {
    parse: parse
};