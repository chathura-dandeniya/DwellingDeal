const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Setup Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup MongoDB
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// User Model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: String,
}));

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) return done(null, false, { message: 'User not found' });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// JWT Middleware
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

// User Registration
app.post('/signup', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { _id, username, role } = req.user;
  const token = jwt.sign({ _id, username, role }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

// Protected Route for Admin
app.get('/admin', authenticateJWT, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Admin route accessed successfully' });
  } else {
    res.sendStatus(403);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
