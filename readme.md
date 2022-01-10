# e-commerce

The project consists of an API that receives data from items and shopping carts, stores this information in a SQLite database, and returns a summary of what was stored, making calculations when necessary, in addition to being able to checkout a shopping cart receiving data, which are inherent to this task, such as e-mail, credit card data, among others.

The API consists of 3 levels, in both we can use the same endpoints, to access each level navigate through the GIT branches, each level is properly marked by a branch. It is very important to delete the `src\database\database.sqlite` file, and perform database migrations at each level of the project.
to perform migrations use:

> yarn typeorm migration:run

### endpoints are.

> /add_article_and_cart

> /checkout_order

to make it easier you can import the insomnia collection file for faster testing.

`Insomnia_2022-01-10.json`

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
