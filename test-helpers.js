exports.createLaunchRequest = function(settings) {
  return {
    request: {
      type: 'LaunchRequest'
    },
    context: {
      System: {
        user: {
          userId: settings.userId
        }
      }
    }
  };
};

exports.createIntentRequest = function(settings) {
  return {
    request: {
      type: 'IntentRequest',
      intent: {
        name: settings.name,
        slots: Object.fromEntries(
          Object.entries((settings.slots || {})).map(([key, value]) =>
            [key, { value }])
        ),
        confirmationStatus: settings.confirmationStatus
      }
    },
    context: {
      System: {
        user: {
          userId: settings.userId
        }
      }
    }
  };
};

exports.callHandler = function(handler, request) {
  return new Promise((resolve, reject) => {
    handler(request, {}, function(err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  })
};

exports.speechText = result => result.response.outputSpeech.ssml;
exports.sessionEnded = result => result.response.shouldEndSession;