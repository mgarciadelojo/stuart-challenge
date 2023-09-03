# Title

## Context
Let's talk about how to perform request validations for our API endpoints.

## Decision
There are multiple options when it comes to this topic. The different alternatives are:

- Plain validators in controllers
- express-validator: https://express-validator.github.io/docs
- Class validator: https://github.com/typestack/class-validator
- Joi: https://joi.dev/api/?v=17.4.2

Pros and cons of the above solutions are:

- If you want a straightforward solution with minimal external dependencies, plain validators in controllers are the simplest option.
- If you're using Express and want middleware-based validation, express-validator is a good choice.
- If you value strong typing and reusability, Class Validator is a great option. It also works well with multiple web frameworks.
- If you need powerful schema validation and are willing to deal with verbosity, Joi is a versatile choice, but it may require extra TypeScript type definition work.

Due to the simplicity of the API, I am going for the express-validator solution. It is a good balance between simplicity and reusability.

## Consequences
The chosen solution will allow us to validate the requests to our API endpoints very fast without adding lots of conditionals to our code. It will also allow us to reuse the validators in other parts of the code if needed.
