const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");

const authRoutes = require("./routes/auth");

// Load env vars
dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");

// Body parser
app.use(bodyParser.json());

// connect to DB
connectDB();

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.use("/api/v1/auth", authRoutes);

// Error handlers
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`.yellow.bold);
});

// Handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
