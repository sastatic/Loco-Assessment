# Loco Assessment

This project is a RESTful web service built using Node.js, Express.js, and Prisma. It handles transactions, supports querying by type, and calculates sums of linked transactions.

## Features

- **Create a Transaction**
- **Retrieve a Transaction**
- **List Transactions by Type**
- **Calculate Sum of Linked Transactions**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Run the Application with Docker

1. Ensure Docker is installed and running on your system.
2. Build and start the containers:

    ```bash
    docker-compose up --build
    ```

   This will set up the application.

### 3. Access the API

The service will be available at `http://localhost:3000`.

### 4. Run Tests

To execute the automated tests:

```bash
docker exec -it loco-assessment npm test
```

### API Endpoints

- **Create Transaction**: `PUT /transactionservice/transaction/:transaction_id`
- **Get Transaction**: `GET /transactionservice/transaction/:transaction_id`
- **List Transactions by Type**: `GET /transactionservice/types/:type`
- **Get Transaction Sum**: `GET /transactionservice/sum/:transaction_id`

## Project Structure

```plaintext
prisma/
├── migrations/         # All Migrations done so far
├── schema.prisma       # Our Schema
├── seed.js             # Seeding Data
src/
├── config/             # Configuration files
├── controllers/        # Request handling logic
├── middlewares/        # Some basic middlewares
├── routes/             # API routes
├── services/           # Business logic and Prisma interactions
tests/                  # Automated tests
├── transaction/        # Tests regarding all the transactions
```