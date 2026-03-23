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
  - verifies credentials
- SQLite database for storing user credentials

## how to run

1. download or clone this repository:

```bash
git clone https://github.com/jwang0521/simple-front-end-form.git
```
