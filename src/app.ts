import express from "express";
import userRoutes from "./routes/userRoutes";
import cropRoutes from "./routes/cropRoutes";
import fieldRoutes from "./routes/fieldRoutes";
import staffRoutes from "./routes/staffRoutes";
import { authenticateToken } from "./routes/authRoutes";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authenticateToken);

app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/staff", staffRoutes);

export default app;