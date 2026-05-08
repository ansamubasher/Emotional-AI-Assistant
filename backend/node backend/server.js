const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Connect to DB before starting the server
connectDB();

// Routes
const stressRoutes = require("./routes/stressRoutes");
const empathyRoutes = require("./routes/empathyRoutes");
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);
app.use("/stress", stressRoutes);
app.use("/empathy", empathyRoutes);
app.use("/journals", journalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));