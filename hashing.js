// server.js (Node.js example)
const bcrypt = require('bcrypt');
const saltRounds = 10;

// During registration
const password = req.body.password;
const hashedPassword = await bcrypt.hash(password, saltRounds);
// Store hashedPassword in the database
