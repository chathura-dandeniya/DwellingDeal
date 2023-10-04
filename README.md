# DwellingDeal E-Commerce Platform - Payment Method Implementation

Description

DwellingDeal is an e-commerce platform developed as a group project. This repository focuses on the implementation of a payment method using the Stripe API. The main components include payment handling, validation, configuration management, and error handling.

Table of Contents

Installation
Usage
API Endpoints
Contact

Installation

Prerequisites - Ensure you have Node.js and npm installed on your machine.

Steps

    Step 01 - Clone the repository: git clone https://github.com/chathura-dandeniya/DwellingDeal/tree/Payment-method-and-handling
    Step 02 - Navigate to the project directory: cd Payment-method-and-handeling
    Step 03 – Install Dependencies – npm install
    Step 04 - Set up your environment variables. Edit the .env file in the root directory and populate it with necessary configurations (Add you stripe keys and MongoDB URI). 

Usage

Start the application: npm start
The server will start, typically on port 3000, and you can interact with the API.

API Endpoints

Further documentation on the API endpoints related to payment handling would be beneficial. Here's a general structure that you might consider:

Endpoint: 1
Route: /
Method: GET
Action: Renders a view named index with a title and a welcome message.

Endpoint: 2
Route: /create
Method: POST
Action: Validates the request body using PaymentValidator.
Creates a checkout session using PaymentHandler.
Sends a JSON response containing the URL from the created session.

Contact
    Name – 
    Project Link - 



