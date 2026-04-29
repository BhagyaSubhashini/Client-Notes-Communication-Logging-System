import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import attachmentRoutes from "./routes/attachmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});



// ✅ ADD THIS LINE
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/uploads", express.static("uploads"));

export default app;