const winston = require('winston');
const dialogFlow = require('dialogflow');
const structjson = require('./structjson');
const config = require('config');

const projectID = config.get('googleProjectID');
const sessionID = config.get('dialogFlowSessionID');
const languageCode = config.get('dialogFlowSessionLanguageCode');

const credentials = {
  client_email: config.get('googleClientEmail'),
  private_key: config.get('googlePrivateKey'),
};

const sessionClient = new dialogFlow.SessionsClient({ projectID, credentials });

const handleTextQuery = async ({ text, userID, parameters = {} }) => {
    const self = module.exports;
    const sessionPath = sessionClient.sessionPath(projectID, `${sessionID}${userID}`);
    
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    winston.info('Detected intent');
    const result = responses[0].queryResult;
    winston.info(`  Query: ${result.queryText}`);
    winston.info(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
    winston.info(`  Intent: ${result.intent.displayName}`);
    } else {
    winston.info(`  No intent matched.`);
    }

    //responses = await self.handleAction(responses);
    return responses;
  }

module.exports = { handleTextQuery }