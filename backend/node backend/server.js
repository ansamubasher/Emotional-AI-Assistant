
const express = require("express");
const app = express();

const stressRoutes = require("./routes/stressRoutes");
const empathyRoutes = require("./routes/empathyRoutes");
const recommenderRoutes = require("./routes/recommenderRoutes");

app.use(express.json());

// routes
app.use("/stress", stressRoutes);
app.use("/recommend", recommenderRoutes);
app.use("/empathy", empathyRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node server running on port ${PORT}`);
});