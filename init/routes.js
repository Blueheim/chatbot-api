const express = require('express');
const chatbotRoutes = require('../routes/chatbotRoutes');
const error = require('../middleware/error')

module.exports = function(app) {
	app.use(express.json());
  app.use('/api/chatbot', chatbotRoutes);
  //Error handling middleware
  app.use(error);
};