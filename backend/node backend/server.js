const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to DB before starting the server
connectDB();

// Routes
const stressRoutes = require("./routes/stressRoutes");
const empathyRoutes = require("./routes/empathyRoutes");
// const authRoutes = require("./routes/authRoutes");

// app.use("/auth", authRoutes);
app.use("/stress", stressRoutes);
app.use("/empathy", empathyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));