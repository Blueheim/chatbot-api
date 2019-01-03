
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const chatbot = require('../chatbot/chatbot');

router.post('/text_query', async (req, res) => {
	const { error } = validateTextQuery(req.body);

	if (error) {
		//400 Bad request
		return res.status(400).send(error.details[0].message);
	}

  const responses = await chatbot.handleTextQuery(req.body);

  res.send(responses[0].queryResult);
});

function validateTextQuery(queryBody) {
	const schema = {
	text: Joi.string().required(),
    userID: Joi.string().guid({version: 'uuidv4'}).required(),
    parameters: Joi.object()
	};

	return Joi.validate(queryBody, schema);
}

function validateEventQuery(queryBody) {
	const schema = {
		event: Joi.string().required(),
    userID: Joi.string().guid({version: 'uuidv4'}).required(),
    parameters: Joi.object(),
	};

	return Joi.validate(queryBody, schema);
}

// ----------------------   EXPORT --------------------------------
module.exports = router;