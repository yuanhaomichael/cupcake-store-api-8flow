# Cupcake Store API

## Instructions

Run `yarn` first to install dependencies.
Run `yarn start` to start the server on http://localhost:3000 and make requests with Postman according to the OpenAPI spec. While the server is running, run `yarn test` to test database and API functions.

### Version
- **API Version:** 1.0.0

### Contact
- **Email:** apiteam@cupcakestore.com

### License
- **License Name:** Apache 2.0
- **License URL:** [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### API Host and Base Path
- **Host:** cupcakestore.swagger.io
- **Base Path:** /v2

### Terms of Service
- **URL:** [Terms of Service](https://8flow.ai/)

---

## API Endpoints

### Cupcake Management

#### `POST /cupcake`
- **Summary:** Add a new cupcake to the store
- **Operation ID:** addCupcake
- **Consumes:** application/json
- **Produces:** application/json
- **Responses:**
  - `405`: Invalid input

#### `GET /cupcake`
- **Summary:** List all cupcakes
- **Operation ID:** listCupcakes
- **Produces:** application/json
- **Responses:**
  - `200`: successful operation

#### `GET /cupcake/{cupcakeId}`
- **Summary:** Find cupcake by ID
- **Operation ID:** getCupcakeById
- **Produces:** application/json
- **Responses:**
  - `200`: successful operation
  - `400`: Invalid ID supplied
  - `404`: Cupcake not found

#### `PUT /cupcake/{cupcakeId}`
- **Summary:** Update an existing cupcake
- **Operation ID:** updateCupcake
- **Consumes:** application/json
- **Produces:** application/json
- **Responses:**
  - `400`: Invalid ID supplied
  - `404`: Cupcake not found
  - `405`: Validation exception

#### `DELETE /cupcake/{cupcakeId}`
- **Summary:** Deletes a cupcake
- **Operation ID:** deleteCupcake
- **Produces:** application/json
- **Responses:**
  - `400`: Invalid ID supplied
  - `404`: Cupcake not found

---

## Models

### Cupcake
- **Type:** object
- **Required:** name, price
- **Properties:**
  - **id:** integer (int64)
  - **name:** string
  - **description:** string
  - **price:** number
  - **ingredients:** array of strings

