# Testing

## Context
To enhance code coverage and ensure the quality of the system, several decisions were made. The previous architectural choices, which adhered to SOLID principles, made it easy to unit test each component of the system. However, time constraints posed a challenge in achieving extensive testing.

## Decision
Considering the time constraints, I have made the decision to focus on covering the required functionality in the exercise and demonstrate my knowledge through the inclusion of some unit tests. Given a bit more time, the following actions would have been taken:

- Expand unit testing coverage to encompass a wider range of scenarios and increase overall code coverage.
- Implement end-to-end testing to verify the smooth functioning of the entire system within an environment closely resembling production.
- Incorporate contract testing to ensure adherence to the specified API contract, as it holds significant importance.

## Consequences
As a result of this decision, there is a chance that certain requirements mentioned in the exercise may be unintentionally missed. Although manual testing was used to ensure coverage, it's important to recognize that humans can make mistakes. By focusing on specific testing priorities due to limited time, there is a possibility of unintentionally overlooking certain aspects.
