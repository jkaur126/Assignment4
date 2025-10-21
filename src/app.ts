import express from "express";
import morgan from "morgan";
import loanRoutes from "./api/v1/routes/loanRoute";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", loanRoutes);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "High-Risk Loan Application Monitoring System API" });
});

export default app;
