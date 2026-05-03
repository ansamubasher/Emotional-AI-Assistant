
const express = require("express");
const app = express();

const stressRoutes = require("./routes/stressRoutes");
const empathyRoutes = require("./routes/empathyRoutes");
const recRoutes= require("./routes/recommenderRoutes");

app.use(express.json());

// routes
app.use("/api/stress", stressRoutes);
app.use("/api/rec", recommenderRoutes);
app.use("/api/empathy", empathyRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node server running on port ${PORT}`);
});