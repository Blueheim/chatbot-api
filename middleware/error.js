const winston = require('winston');

module.exports = (err, req, res, next) => {
	// winston.log('error', err.message);
	winston.error(err.message, err);

	//error
	//warn
	//info
	//verbosea
	//debug
	//silly

	res.status(500).send('Unexpected Error');
};
