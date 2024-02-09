# Storage-Manager

An inventory management system with basic CRUD functionality..

Some technologies used:

* Angular(9.x);
* Angular Material;
* Html;
* CSS;
* TypeScript;
* MySQL;
* Node;
* Express.

## Routes

The route is linked to the address "localhost:3001/products ...". The backend runs on port 3001 and the frontend on port 4200. Below is a specification of the routes.

* Get: /products;

* Get: /products/:id - Parameters: { id };

* Post: /products - Body: { "name": "string", "price": "number" };

* Put: /products/:id  - Parameters: { id } + Body: { "name": "string", "price": "number" };

* Delete: /products/:id - Parameters: { id };

## Running the app

**Obs 1**: Adjust your MySQL configuration (./backend/src/modal/database.ts);

**Obs 2**: Make sure the Backend is running before starting the Frontend, otherwise bugs may occur;

```bash
# Installation
# Go to "cd ./frontend" and in "cd ./backend". Then run:
$ npm install

# Running
# Open two terminals and go to "cd ./frontend" in one, and "cd ./backend" in the other. Then run on both:
$ npm start

# Or use the Json-Server:
$ npm start-local
```