// server.js (Node.js example)
const jwt = require('jsonwebtoken');

// During login
const user = { id: user.id, username: user.username };
const token = jwt.sign(user, 'your-secret-key');
// Send the token to the client

// To verify and decode the token on protected routes
const decoded = jwt.verify(token, 'your-secret-key');
