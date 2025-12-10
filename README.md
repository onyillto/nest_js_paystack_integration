# NestJS Paystack Integration

A starter project demonstrating how to integrate the Paystack payment gateway with a NestJS application.

## About the Project


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

2. Install dependencies
    ```bash
    npm install
   
    ```

### Configuration

1. Create a .env file in the root of the project by copying the example file:

    ```bash
     .env
    ```

2. Open the .env file and add your Paystack secret key:
    ```env
    PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

---

## Usage

### Running the App

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod