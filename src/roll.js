function roll(args, callback) {
	var max = parseInt(args, 10);
	
	if (isNaN(max)) {
		max = 100;
	}
	
	if (max < 1) {
		callback('too low');
	}
	
	callback(Math.floor(Math.random() * (max + 1)));
}

module.exports = roll;