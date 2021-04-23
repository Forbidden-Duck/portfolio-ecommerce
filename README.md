# codecademy-ecommerce-rest-api
Node/Express REST API to provide typical functionality found in an ecommerce website.  Users can create accounts, view products, add products to a cart, and place/view orders.

## Running the app
To run locally, `npm install`, then `npm run start`

This project requires a [MongoDB](https://www.mongodb.com/try/download/community) database to be running locally.

This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `process.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

This repo also includes an `swagger-example.yml`. The original contains the IP address of our database. Make sure to change the IP address associated and create a file named `swagger.yml`

Once the app is running locally, you can access the API at `http://<ip>:<port>`

## Testing
Swagger documentation available at `http://<ip>:<port>/docs`

You can use various HTTP clients such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to make requests to the API endpoints.

**Note:** Some endpoints are protected and require authentication.  In order to properly access these endpoints, you will need to have a session cookie present when making your request.  This is accessed by hitting the `/auth/login` endpoint first.  HTTP clients will automatically store cookies and send them with subsequent requests.

## Resources
- [REST Architecture](https://www.codecademy.com/articles/what-is-rest)
- [Setting up Postman](https://learning.postman.com/docs/getting-started/settings/)
- [Documenting your API with Swagger](https://swagger.io/resources/articles/documenting-apis-with-swagger/)

## Options for Extension
- Add additional API endpoints (endpoints for categories, addresses, etc)
- Add ability to maintain multiple carts per user
- Add ability to interact with the API as a guest