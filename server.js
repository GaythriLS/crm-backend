require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./app/middleware/errorHandler");

const authRoutes = require("./app/routes/authRoutes");
const customerRoutes = require("./app/routes/customerRoutes");
const caseRoutes = require("./app/routes/caseRoutes");
const userRoutes = require("./app/routes/userRoutes");
const dashboardRoutes = require("./app/routes/dashboardRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CRM Backend API is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      customers: "/api/customers",
      cases: "/api/cases",
      users: "/api/users",
      dashboard: "/api/dashboard",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 CRM Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api\n`);
});

module.exports = app;
