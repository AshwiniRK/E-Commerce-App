# E-Commerce Order Management System

## Description

This Node.js application manages orders for an e-commerce platform using MongoDB. It includes functionality to add orders, update order statuses, and calculate monthly revenue.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AshwiniRK/E-Commerce-App.git
   cd your-repository

##  Install Dependencies
npm install
## Configuration
Set Up MongoDB
Update the MongoDB connection URI in config.js:
// config.js
module.exports = {
  mongoURI: 'mongodb://localhost:27017/your-database-name',
};
  ## API Endpoints
  ## Add Order
  POST /api/orders

  {
  "orderId": "string",
  "customerId": "string",
  "items": [
    {
      "itemId": "string",
      "quantity": 1,
      "price": 9.99
    }
  ],
  "orderDate": "2024-09-13T00:00:00Z",
  "status": "Pending"
}


 ## Update Order Status
PATCH /api/orders/:orderId/status


## Calculate Monthly Revenue
## GET /api/revenue

Query Parameters:

month (required): The month to calculate revenue for (1-12).
year (required): The year to calculate revenue for.

## Example Request:
/api/revenue?month=9&year=2024

## Testing
npm install --save-dev mocha chai

## Acknowledgments
MongoDB for the database.
Express for the server framework.
Mongoose for the ODM (if used).
Mocha and Chai for testing.
