# Stuart Challenge

The original [README.md](docs/original-README.md) document can be found in the `docs` folder.

## Setup
### Run API Locally
```
docker-compose up postgresql -d
npm install
npm run api:dev
```

Output:
```
Server running on http://localhost:3000
```

*Note: node >= 18.x (LTS)*

### Run Tests
```
npm run test
```

### Replicate Production Locally
```
docker-compose up
```

## Endpoint's Contracts

1. Keep sync of couriers:
```
curl --location 'localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data '{
    "courier_id": 6,
    "max_capacity": 85
}'
```

2. Courier available capacity lookup:
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

In order for this exercise to be fully understood by whomever is reading this document, I will start by listing the assumptions I made when designing the API.

### Main Goal
The two objectives defined in the `Main Goal` section of the original README.md document made me lean towards the idea that the endpoint...

```
curl -X POST http://localhost:3000/couriers --data '
{
  "courier_id": 1234,
  "max_capacity": 45
}'
```

is for creating a new courier, updating an existing one or removing their capacity (by setting it to 0). Because the contracts where already defined (and not to be changed) and the two following sentences:

> The Stuart API will need to **keep in sync** the list of Couriers ...

> Write the API that will allow **adding, removing and updating couriers' capacities**


### Bonus Goals

The first of the bonus goals says:

> Allow the API to update a courier's available capacity at any moment as they are assigned new packages.

The requirements were not very clear on this one. Since the first assumption of the `Main Goals` section allows updating the capacity of a Courier at any moment, I thought this was covered until the requirements could be clarified by a Stakeholder.

## If I had more time

If I had more time, I would have done the following:
- Add more tests, as I added the bare minimum unit tests to show my knowledge. Although unit tests are important, recently I became more interested in integration tests. See [this testing trophy article](https://medium.com/@mateuszroth/why-the-test-pyramid-is-a-bullshit-guide-to-testing-towards-modern-frontend-and-backend-apps-4246e89b87bd)
- Observability: logging to start with, then metrics. APM would be nice too.
- Add a CI/CD pipeline to automate the deployment of the API
- Implement the output schema described in the `ADR` documents
- Better error handling, with domain errors and a smarter error handler middleware that can process errors and transform them into their HTTP status counterparts
- Database migrations instead of using TypeORM's `synchronize` option
- Lock dependencies' version numbers on `package.json`
