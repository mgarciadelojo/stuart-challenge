### Full Stack Engineer Assessment

## Duration of the test

You should be spending from 2 to 4 hours to finish this test.

## Tech Stack

At Stuart, the most popular programming languages are NodeJS/Typescript, Ruby and Python. You are encouraged to attempt this assessment in any of the languages mentioned.

## Description
Being able to track the spare capacity that a courier has in their vehicle at any time is crucial. Our Dispatcher (the brain that optimizes the delivery routes) needs this input so that it can understand if a courier has room enough space in their vehicle.

## Main Goal

Write an API that will be queried by two services: the Stuart API and the Dispatcher.

The Stuart API will need to keep in sync the list of Couriers in the platform as well as their max capacity (in liters).
```bash
curl -X POST http://localhost:3000/couriers --data '
{
  "courier_id": 1234,
  "max_capacity": 45
}'
```

The Dispatcher will need to query this API to find out which couriers do have available space.
```bash
curl -X GET http://localhost:3000/couriers/lookup --data '
{
  "capacity_required": 45
}'
```

Write the API that will allow adding, removing and updating couriers' capacities, as well as an endpoint that will lookup and return a list of couriers whose capacity is greater or equal to the one required.

## Bonus Goals

In case you are feeling going deeper, here are some proposed bonus goals. Pick any that you want or add your own.

* Courier capacities vary as they pick and deliver packages. Allow the API to update a courier's available capacity at any moment as they are assigned new packages.
* We plan to run this service in the AWS environment. Prepare this API to be deployed.
* Come up with a smart and scalable output schema that is future-proof. Explain why you think it is so.
* How about race conditions? How would you avoid race conditions if a lookup is being executed and a capacity update comes?
* …

## Notes
* How do we run this API? Please provide the right amount of documentation in any format you prefer.
* Show off! We love TDD. We love unit tests. We love design patterns. We love engineering!
* If you were to have more time, what would you do? Briefly explain what could be improved.
* If you have further questions, don't hesitate asking.
