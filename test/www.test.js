// const { normalizePort } = require('../bin/www'); // Adjust path
// const app1 = require('../app'); // Adjust path
// const mongoose = require('mongoose');

// let server1;
// let server2;
// let db;

// beforeAll(async () => {
//     // Start servers on different ports to avoid conflicts
//     server1 = app1.listen(3001);
//     server2 = app1.listen(3000);

//     // Connect to a test database
//     db = await mongoose.connect(process.env.MONGO_URI);
// });

// afterAll(async () => {
//     // Close servers and database connection
//     await server1.close();
//     await server2.close();
//     await db.disconnect();
// });

// // Example test for normalizePort
// test('normalizePort should return a number when a string number is passed', () => {
//     expect(normalizePort('3001')).toBe(3001);
// });

//...............................................................

// const { onError } = require('../bin/www');

// test('onError should throw the error if error.syscall is not listen', () => {
//     const error = new Error('Test Error');
//     error.syscall = 'not_listen';
//     expect(() => onError(error)).toThrow('Test Error');
// });

//...............................................................

// const { onListening } = require('../bin/www');
// const logger = require('../lib/logger');

// jest.mock('../lib/logger');

// test('onListening should log the correct message when listening on a numeric port', () => {
//     const mockServer = { address: () => ({ port: 3000 }) };
//     onListening.bind(mockServer)();
//     expect(logger.info).toHaveBeenCalledWith('server listening on 3000');
// });

// For this test, you might need to refactor your code to make the chosen port retrievable after server start

//...............................................................
// const app = require('../app');

// test('server should read the port from the environment variable', () => {
//     process.env.PORT = '3001';
//     const server = app.startServer(); // Assuming you have a startServer function
//     expect(server.address().port).toBe(4000);
// });

// //...............................................................

// test('Stripe is initialized with correct API key', () => {
//     const secretConfig = require("../config");
//     const stripe = require("stripe")(secretConfig.STRIPE_SECRET_KEY);

//     expect(stripe).toBeDefined();
//     expect(secretConfig.STRIPE_SECRET_KEY).toBe(process.env.STRIPE_SECRET_KEY);
// });

//...............................................................

// const PaymentHandler = require('../lib/handlers/PaymentHandler');
// const secretConfig = require("../config");
// const stripe = require("stripe");

// // Mocking stripe module
// jest.mock("stripe");

// describe('PaymentHandler', () => {

//     beforeEach(() => {
//         // Resetting the stripe mock before each test
//         stripe.mockClear();
//     });

//     test('Create a valid checkout session', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 },
//             { productId: 2, quantity: 1 }
//         ];
//         const mockSession = { id: 'sessionId' };

//         stripe.mockReturnValue({
//             checkout: {
//                 sessions: {
//                     create: jest.fn().mockResolvedValue(mockSession)
//                 }
//             }
//         });

//         const session = await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(stripe).toHaveBeenCalledWith(secretConfig.STRIPE_SECRET_KEY);
//         expect(session).toEqual(mockSession);
//     });

//     test('Handle empty input for checkout session creation', async () => {
//         const mockSession = { id: 'sessionId' };

//         stripe.mockReturnValue({
//             checkout: {
//                 sessions: {
//                     create: jest.fn().mockResolvedValue(mockSession)
//                 }
//             }
//         });

//         const session = await PaymentHandler.CreateCheckoutSession([]);

//         expect(session).toEqual(mockSession);
//     });

//     test('Handle invalid product ID', async () => {
//         const storeItemsObj = [
//             { productId: 999, quantity: 1 }
//         ];

//         await expect(PaymentHandler.CreateCheckoutSession(storeItemsObj)).rejects.toThrow();
//     });

//     test('Handle API errors', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 1 }
//         ];

//         stripe.mockReturnValue({
//             checkout: {
//                 sessions: {
//                     create: jest.fn().mockRejectedValue(new Error('API Error'))
//                 }
//             }
//         });

//         await expect(PaymentHandler.CreateCheckoutSession(storeItemsObj)).rejects.toThrow('API Error');
//     });

//     test('Validate redirection URLs', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 }
//         ];

//         const createMock = jest.fn();
//         stripe.mockReturnValue({
//             checkout: {
//                 sessions: {
//                     create: createMock.mockResolvedValue({})
//                 }
//             }
//         });

//         await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(createMock).toHaveBeenCalled();
//         const callArgs = createMock.mock.calls[0][0];
//         expect(callArgs.success_url).toBe(`${secretConfig.CLIENT_URL}/success.html`);
//         expect(callArgs.cancel_url).toBe(`${secretConfig.CLIENT_URL}/cancel.html`);
//     });
// });

// const PaymentHandler = require('../lib/handlers/PaymentHandler');
// const secretConfig = require("../config");
// const stripe = require("stripe");

// // Mocking stripe module
// jest.mock("stripe");

// describe('PaymentHandler', () => {

//     beforeEach(() => {
//         // Resetting the stripe mock before each test
//         stripe.mockClear();
//     });

//     test('Create a valid checkout session', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 },
//             { productId: 2, quantity: 1 }
//         ];
//         const mockSession = { id: 'sessionId' };

//         // Correcting the mock structure
//         stripe.mockReturnValueOnce({
//             checkout: {
//                 sessions: {
//                     create: jest.fn().mockResolvedValueOnce(mockSession)
//                 }
//             }
//         });

//         const session = await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(stripe).toHaveBeenCalledWith(secretConfig.STRIPE_SECRET_KEY);
//         expect(session).toEqual(mockSession);
//     });

//     // ... [other tests] ...

//     test('Validate redirection URLs', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 }
//         ];

//         const createMock = jest.fn().mockResolvedValueOnce({});
//         stripe.mockReturnValueOnce({
//             checkout: {
//                 sessions: {
//                     create: createMock
//                 }
//             }
//         });

//         await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(createMock).toHaveBeenCalled();
//         const callArgs = createMock.mock.calls[0][0];
//         expect(callArgs.success_url).toBe(`${secretConfig.CLIENT_URL}/success.html`);
//         expect(callArgs.cancel_url).toBe(`${secretConfig.CLIENT_URL}/cancel.html`);
//     });
// });


// const PaymentHandler = require('../lib/handlers/PaymentHandler');
// const secretConfig = require("../config");
// const stripe = require("stripe");

// jest.mock("stripe", () => {
//     return jest.fn(() => {
//         return {
//             checkout: {
//                 sessions: {
//                     create: jest.fn()
//                 }
//             }
//         };
//     });
// });

// describe('PaymentHandler', () => {
//     const stripeMock = stripe();

//     beforeEach(() => {
//         // Resetting the stripe mock before each test
//         jest.clearAllMocks();
//     });

//     test('Create a valid checkout session', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 },
//             { productId: 2, quantity: 1 }
//         ];
//         const mockSession = { id: 'sessionId' };

//         stripeMock.checkout.sessions.create.mockResolvedValueOnce(mockSession);

//         const session = await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(stripe).toHaveBeenCalledWith(secretConfig.STRIPE_SECRET_KEY);
//         expect(session).toEqual(mockSession);
//     });

//     // ... [other tests] ...

//     test('Validate redirection URLs', async () => {
//         const storeItemsObj = [
//             { productId: 1, quantity: 2 }
//         ];

//         stripeMock.checkout.sessions.create.mockResolvedValueOnce({});

//         await PaymentHandler.CreateCheckoutSession(storeItemsObj);

//         expect(stripeMock.checkout.sessions.create).toHaveBeenCalled();
//         const callArgs = stripeMock.checkout.sessions.create.mock.calls[0][0];
//         expect(callArgs.success_url).toBe(`${secretConfig.CLIENT_URL}/success.html`);
//         expect(callArgs.cancel_url).toBe(`${secretConfig.CLIENT_URL}/cancel.html`);
//     });
// });