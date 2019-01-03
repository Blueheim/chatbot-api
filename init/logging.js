const winston = require('winston');
// require('winston-mongodb'); // Can create bug freeze with jest
require('express-async-errors');

module.exports = function() {
	winston.exceptions.handle(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' })
		//use a process manager to restart for a clean state
	);

	process.on('unhandledRejection', ex => {
		throw ex; 
	});

	//winston.add(new winston.transports.File({ filename: 'logfile.log' }));
};
