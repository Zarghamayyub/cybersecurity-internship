const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

let users = [];

/* REGISTER PAGE */
router.get('/register', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form method="POST" action="/register">
      <input name="email" type="email" placeholder="Email" required /><br><br>
      <input name="password" type="password" placeholder="Password" required /><br><br>
      <button type="submit">Register</button>
    </form>
  `);
});

/* REGISTER LOGIC */
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.send("Registration successful ✅ <br><a href='/login'>Go to Login</a>");
});

/* LOGIN PAGE */
router.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input name="email" type="email" placeholder="Email" required /><br><br>
      <input name="password" type="password" placeholder="Password" required /><br><br>
      <button type="submit">Login</button>
    </form>
  `);
});

/* LOGIN LOGIC */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.send("User not found ❌");
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.send("Login successful ✅");
  } else {
    res.send("Invalid password ❌");
  }
});

module.exports = router;
