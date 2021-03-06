const Alexa = require('ask-sdk-core');

exports.isLaunchRequest = () => handlerInput => 
  Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';

const isAnyIntentRequest = handlerInput =>
  Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';

const isIntentRequestMatching = intentName => handlerInput =>
  isAnyIntentRequest(handlerInput) && Alexa.getIntentName(handlerInput.requestEnvelope) === intentName;

exports.isIntentRequest = (intentName = null) =>
  intentName === null ? isAnyIntentRequest : isIntentRequestMatching(intentName);

exports.isResponseRequest = responseName => handlerInput =>
  Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
    && handlerInput.requestEnvelope.request.name === responseName;

exports.isSessionEndedRequest = () => handlerInput => Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';

/* Request stuff */
exports.slot = (handlerInput, name) =>
  Alexa.getSlotValue(handlerInput.requestEnvelope, name);

exports.locals = handlerInput => handlerInput.attributesManager.getRequestAttributes();

exports.addToLocals = (handlerInput, key, value) => {
  let attrs = handlerInput.attributesManager.getRequestAttributes();

  if(typeof key === 'object') {
    let values = key;
    Object.assign(attrs, values);
  } else {
    Reflect.set(attrs, key, value);
  }
};

exports.getUserId = handlerInput => Alexa.getUserId(handlerInput.requestEnvelope);

exports.confirmationStatus = handlerInput => handlerInput.requestEnvelope.request.intent.confirmationStatus;

/* Sessions */
exports.addToSession = (handlerInput, key, value) => {
  let am = handlerInput.attributesManager;
  let sessionAttributes = am.getSessionAttributes();

  if(typeof key === 'object') {
    let values = key;
    Object.assign(sessionAttributes, values);
  } else {
    Reflect.set(sessionAttributes, key, value);
  }

  am.setSessionAttributes(sessionAttributes);
};

exports.getSession = handlerInput =>
  handlerInput.attributesManager.getSessionAttributes();

/* Speech */
exports.pipeBuilder = handlerInput => (...fns) => {
  let builder = handlerInput.responseBuilder;
  for(let i = 0, len = fns.length; i < len; i++) {
    fns[i](builder);
  }
  return builder;
};

exports.pipeResponse = handlerInput => (...fns) => {
  let builder = handlerInput.responseBuilder;
  for(let i = 0, len = fns.length; i < len; i++) {
    fns[i](builder);
  }
  return builder.getResponse();
};

exports.speak = speakOutput => builder => builder.speak(speakOutput.toString());

exports.speakAndReprompt = (speakOutput, repromptOutput = speakOutput) => builder => 
  builder.speak(speakOutput.toString()).reprompt(repromptOutput.toString());

exports.endSession = shouldEnd => builder => builder.withShouldEndSession(shouldEnd);

/* Display */
exports.simpleCard = (title, content) => builder => builder.withSimpleCard(title, content);
exports.standardCard = (title, content, smallImg, largeImg) => builder => builder.withStandardCard(title, content, smallImg, largeImg);
exports.card = (...args) => args.length === 2 ? exports.simpleCard(...args) : exports.standardCard(...args);

/* Conversations */
exports.delegateToConversations = (utteranceSetName, slots = {}) => builder => {
  builder.addDirective({
    type: 'Dialog.DelegateRequest',
    target: 'AMAZON.Conversations',
    period: {
      until: 'EXPLICIT_RETURN' 
    },
    updatedRequest: {
      type: 'Dialog.InputRequest',
      input: {
        name: utteranceSetName,

        /**
         * @example
         * slots: {
         *   name: {
         *     name : 'color',
         *     value: 'red'
         *   }
         * }
         */
        slots
      }
    }
  });
};

/* In-Skill Purchases */
exports.availableProducts = async handlerInput => {
  let locale = handlerInput.requestEnvelope.request.locale;
  let ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
  let result = await ms.getInSkillProducts(locale);
  let products = result.inSkillProducts;
  return products;
};

exports.buyDirective = productId => builder => builder.addDirective({
  type: 'Connections.SendRequest',
  name: 'Buy',
  payload: {
    InSkillProduct: {
      productId: productId
    }
  },
  token: 'correlationToken'
});

exports.cancelDirective = productId => builder => builder.addDirective({
  type: 'Connections.SendRequest',
  name: 'Cancel',
  payload: {
    InSkillProduct: {
      productId: productId
    }
  },
  token: 'correlationToken'
});

exports.purchaseResult = handlerInput => handlerInput.requestEnvelope.request.payload.purchaseResult;