const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// create database
const db = new sqlite3.Database(":memory:");

// create table and insert test user
db.serialize(() => {
  db.run("CREATE TABLE users (email TEXT, password TEXT)");
  db.run("INSERT INTO users VALUES ('test@test.com', '12312312')");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

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

  const query = `
    SELECT * FROM users 
    WHERE email = '${email}' AND password = '${password}'
  `;

  console.log("Executing query:", query);

  db.get(query, (err, row) => {
    if (row) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
