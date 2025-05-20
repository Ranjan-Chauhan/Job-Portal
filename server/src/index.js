import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import applicationRoutes from "./routes/application.routes.js";
// import "./utils/cronJob.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGINs],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
  })
);

// origin: "https://job-portal-livid-nine.vercel.app",
// origin: "http://localhost:5173",

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/applications", applicationRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log(`Server is running on port: ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("MongoDB connection is failed!! ", err);
  });
