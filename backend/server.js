import express from "express";
import dotenv from 'dotenv';
dotenv.config();        // Function should be declare before any of the env file declared variables
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB();    // Connect to MongoDB

const app = express();

// Route for home page
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use('/api/products', productRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));
