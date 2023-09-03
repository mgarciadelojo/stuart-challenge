# Stuart Challenge
This document provides essential information and instructions for setting up and working with the Stuart API project. Below, you'll find details on project setup, running the API locally, testing, and more.

## Project Structure
The original [README.md](docs/original-README.md) document can be found in the `docs` folder for reference.

## Setup
### Run API Locally
To run the API locally, follow these steps:

```
docker-compose up postgresql -d
npm install
npm run api:dev
```

You should see the following output indicating that the server is running on `http://localhost:3000`:
```
Server running on http://localhost:3000
```

*Note: The project requires Node.js version 18.x (LTS).*

### Run Tests
To run tests for the API, use the following command:

```
npm run test
```

### Replicate Production Locally
To replicate the production environment locally, run the following command:

```
docker-compose up
```

## Endpoint's Contracts
The API provides the following endpoints with their corresponding contracts:

1. **Keep Sync of Couriers** (POST)
```
curl --location 'localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data '{
    "courier_id": 6,
    "max_capacity": 85
}'
```

2. **Courier Available Capacity Lookup** (GET)
```
curl --location --request GET 'localhost:3000/couriers/lookup?capacity_required=100' \
--header 'Content-Type: application/json'
```

## Architecture Decision Records
Every major decision I have taken is recorded as a Architecture Decision Record for future reference. You can find them in the `docs/adr` folder:

- [001-language-and-framework.md](docs/adr/001-language-and-framework.md)
- [002-architecture-choices.md](docs/adr/002-architecture-choices.md)
- [003-payload-validations.md](docs/adr/003-payload-validations.md)
- [004-testing.md](docs/adr/004-testing.md)
- [005-deployability.md](docs/adr/005-deployability.md)
- [006-output-schema.md](docs/adr/006-output-schema.md)
- [006-race-conditions.md](docs/adr/007-race-conditions.md)

## Assumptions when designing the API
To provide clarity on the API's design decisions, the following assumptions were made:

### Main Goal
The main goals mentioned in the project's original README.md document guided the API's design. Specifically, the endpoint:

```
curl -X POST http://localhost:3000/couriers --data '
{
  "courier_id": 1234,
  "max_capacity": 45
}'
```

was interpreted as a means to create a new courier, update an existing one, or remove their capacity (by setting it to 0). This interpretation aligns with the defined contracts and the following statements from the original document:

- `The Stuart API will need to keep in sync the list of Couriers ...`
- `Write the API that will allow adding, removing and updating couriers' capacities`


### Bonus Goals
The first bonus goal, which states:

- `Allow the API to update a courier's available capacity at any moment as they are assigned new packages.`

was addressed under the assumption that the main goal already allowed updating courier capacities at any time. Further clarification from stakeholders may be needed to refine this feature.

## If I had more time
Given more time, several improvements and enhancements would be considered, including:


- Expanding test coverage, only a bare minimum of unit tests were provided to show my skills and knowledge. Although unit tests are important, recently I became more interested in integration tests. See [this testing trophy article](https://medium.com/@mateuszroth/why-the-test-pyramid-is-a-bullshit-guide-to-testing-towards-modern-frontend-and-backend-apps-4246e89b87bd)
  Implementing observability through logging, metrics, and potentially Application Performance Monitoring (APM).
- Establishing a CI/CD pipeline for automated deployment.
- Implement the output schema described in the `ADR` documents
- Enhancing error handling, including domain-specific errors and a more robust error handler middleware.
- Database migrations instead of using TypeORM's `synchronize` option 
- Locking dependencies' version numbers in the package.json for stability.
- Implementing a more robust and scalable database schema, adding indexes, timestamps and not letting the client define the ID for couriers.

These improvements would contribute to a more robust and maintainable API.
