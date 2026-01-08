# Cybersecurity Internship – Web Application Security

## Internship Organization
DevelopersHub Corporation

## Project Title
Strengthening Security Measures for a Web Application

---

## Overview
This project is part of a cybersecurity internship focused on identifying and fixing
common security vulnerabilities in a web-based user management system.

The application is built using Node.js and Express.js and tested locally.

---

## Week 1: Security Assessment

### Objective
To analyze the web application for common vulnerabilities.

### Tools Used
- Browser Developer Tools
- Manual Input Testing
- OWASP Top 10 Guidelines

### Vulnerabilities Identified
- Cross-Site Scripting (XSS)
- Weak password handling (plain-text passwords)
- Lack of authentication security
- Security misconfigurations (missing headers)

---

## Week 2: Security Implementation

### Improvements Applied
- Password hashing using bcrypt
- Secure user authentication (Register/Login)
- Removal of plain-text password storage
- Improved handling of user credentials

### Technologies Used
- Node.js
- Express.js
- bcrypt

---

## How to Run the Project

```bash
npm install
npm start

