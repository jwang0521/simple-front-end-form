const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// create database
const db = new sqlite3.Database(":memory:");

// create table and insert user info with hashed password
db.serialize(async () => {
  db.run("CREATE TABLE users (email TEXT, password TEXT)");

  const hashedPassword = await bcrypt.hash("12312312", 12);
  db.run("INSERT INTO users VALUES (?, ?)", ["test@test.com", hashedPassword]);
});

// XSS sanitization function
function sanitizeInput(input) {
  return input.replace(/[<>"'%;()&+]/g, "");
}

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // sanitize input
  email = sanitizeInput(email);
  password = sanitizeInput(password);

  // server-side validation
  if (!email || !password) {
    return res.send("Fields cannot be empty");
  }

  if (!email.includes("@")) {
    return res.send("Invalid email format");
  }

  if (password.length < 8) {
    return res.send("Password must be at least 8 characters");
  }

  // parameterized query
  const query = "SELECT * FROM users WHERE email = ?";

  db.get(query, [email], async (err, row) => {
    if (err) {
      return res.send("Database error");
    }

    if (!row) {
      return res.send("User not found");
    }

    // compare hashed password
    const match = await bcrypt.compare(password, row.password);

    if (match) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
