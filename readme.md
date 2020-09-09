# @matthewp/ask-sdk-helpers

Helper functions for use with the [ASK SDK](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/overview.html)

## Usage

## Helpers

### canHandle functions

The following functions are to be used with the ask-sdk handlers, acting as the `canHandle` function.

#### isLaunchRequest()

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

#### isIntentRequest(intentName)

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

#### isResponseRequest(responseName)

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

#### IsBuyResponseRequest()

Indicates a `Connections.Response` request with the name `Buy`. This occurs when the user has gone through the [In-Skill purchase](https://developer.amazon.com/en-US/docs/alexa/in-skill-purchase/add-isps-to-a-skill.html) buy flow. Use [purchaseResult](#purchaseResult()) to determine if the user choose to purchase the item or not.

```js
const {
  IsBuyResponseRequest
} = require('@matthewp/ask-sdk-helpers');

const ShoppingIntentHandler = {
  canHandle: IsBuyResponseRequest(),
  async handle(h) {
    // Proceed with a purchased item.
  }
};
```

#### IsCancelResponseRequest()

Indicates a `Connections.Response` request with the name `Cancel`. This is used in [In-Skill purchases](https://developer.amazon.com/en-US/docs/alexa/in-skill-purchase/add-isps-to-a-skill.html) when the user goes through a cancellation flow.

```js
const {
  IsCancelResponseRequest
} = require('@matthewp/ask-sdk-helpers');

const ShoppingIntentHandler = {
  canHandle: IsCancelResponseRequest(),
  async handle(h) {
    // Proceed with cancellation
  }
};
```

#### isSessionEndedRequest()

Indicates that the session has ended. Use this to do any cleanup necessary at the end of a session.

```js
const {
  isSessionEndedRequest
} = require('@matthewp/ask-sdk-helpers');

const SessionEndedHandler = {
  canHandle: isSessionEndedRequest(),
  async handle(h) {
    // cleanup
  }
};
```

### Request helpers

These helpers are for things related to a request, such as slots and local values.

#### slot(h, name)

Get a value from a [slot](https://developer.amazon.com/en-US/docs/alexa/custom-skills/create-and-edit-custom-slot-types.html).

```js
const {
  isIntentRequest,
  slot
} = require('@matthewp/ask-sdk-helpers');

const AddTodoIntentHandler = {
  canHandle: isIntentRequest('AddTodoIntent'),
  async handle(h) {
    let label = slot(h, 'label');

    // do something with this slot value.
  }
};
```

## License

[BSD 2-Clause](https://opensource.org/licenses/BSD-2-Clause)