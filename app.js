require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

/* ---------------- SECURITY MIDDLEWARES ---------------- */

// Helmet security headers + CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
      },
    },
  })
);

// HSTS
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later.",
});
app.use("/api", limiter);

/* ---------------- BASIC EXPRESS SETUP ---------------- */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/* ---------------- API KEY PROTECTION ---------------- */

function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
  next();
}

app.get("/api/secure-data", apiKeyAuth, (req, res) => {
  res.json({ message: "Secure API Access Granted" });
});

/* ---------------- ERROR HANDLING ---------------- */

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
