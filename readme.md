# @matthewp/ask-sdk-helpers

Helper functions for use with the [ASK SDK](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/overview.html)

## Usage

## Helpers

### isLaunchRequest()

A `canHandle` function for launch requests.

```js
const {
  isLaunchRequest
} = require('@matthewp/ask-sdk-helpers');

const LaunchRequestHandler = {
  canHandle: isLaunchRequest(),
  async handle(h) {
    // do whatever
  }
};
```

### isIntentRequest(intentName)

A `canHandle` function for intent request handlers.

```js
const {
  isIntentRequest
} = require('@matthewp/ask-sdk-helpers');

const ShoppingIntentHandler = {
  canHandle: isIntentRequest('ShoppingIntent'),
  async handle(h) {
    // Do some shopping stuff.
  }
};
```

### isResponseRequest(responseName)

A `canHandle` function for `Connections.Response` requests, as used in [In-Skill purchases](https://developer.amazon.com/en-US/docs/alexa/in-skill-purchase/add-isps-to-a-skill.html).

> Note that you probably want to use `IsBuyResponseRequest()` and `IsCancelResponseRequest()` directly instead. This is a lower-level function.

```js
const {
  isResponseRequest
} = require('@matthewp/ask-sdk-helpers');

const ShoppingIntentHandler = {
  canHandle: isResponseRequest('Buy'),
  async handle(h) {
    // Proceed with a purchased item.
  }
};
```

### IsBuyResponseRequest()

__TODO__

### IsCancelResponseRequest

__TODO__

## License

[BSD 2-Clause](https://opensource.org/licenses/BSD-2-Clause)