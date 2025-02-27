import express from "express";
import userRoutes from "./routes/userRoutes";
import cropRoutes from "./routes/cropRoutes";
import fieldRoutes from "./routes/fieldRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fields", fieldRoutes);

export default app;