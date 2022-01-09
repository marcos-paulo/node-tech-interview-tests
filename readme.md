# e-commerce

The project consists of an API that receives data from items and shopping carts, stores this information in a SQLite database, and returns a summary of what was stored, making calculations when necessary, in addition to being able to checkout a shopping cart receiving data, which are inherent to this task, such as e-mail, credit card data, among others.

The API consists of 3 levels, each with its own particularities:

## Level 1

Consists of the following endpoints:

## RUN SETTINGS

To run the project, you can use `npm` or `yarn` as you wish, in this document we will only use `yarn`.

### PORT

You can change the port that express uses to listen for requests in the `.env` file, which is located at the root of the project. Port 3000 is the default, change as needed.

```json
PORT=3000
```

### TESTS

To run the project tests, use the command:

> yarn test

### RUN

To run the project use:

> yarn dev

## ENDPOINTS
