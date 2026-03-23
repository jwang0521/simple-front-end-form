# Simple Front-End form

## project overview

This is a basic login form inspired from OAWSP Juice Shop for CSCE 477 homework 3. It demonstrates how user input is handled and highlights security concepts such as validation, SQL injection and cross-site scripting(XSS).

## features

### Frontend (client-side)

- built with HTML + JavaScript
- takes email and password inputs
- client side validation:
  - fields cannot be empty
  - email must contain @
  - password must be at least 8 characters

### Backend (server-side)

- Built with Node.js + Express
- server side validation:
  - same checks as client
  - re-validates all input to prevent bypass of client-side checks
- SQLite database for storing user credentials
- applies parameterized queries to prevent SQL Injection attacks
- includes basic input sanitization to reduce XSS risks
- stores passwords securely using bcrypt hashing with salt
- verifies user credentials by comparing hashed passwords during login

## how to run

1. download or clone this repository:

```bash
git clone https://github.com/jwang0521/simple-front-end-form.git
```
