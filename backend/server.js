import express from "express";
import dotenv from 'dotenv';
dotenv.config();        // Function should be declare before any of the env file declared variables
import connectDB from './config/db.js';
import products from './data/products.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Route for home page
app.get("/", (req, res) => {
  res.send("API is running");
});

// Route for all the products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route for single products
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
})

app.listen(port, () => console.log(`Server is running on port ${port}`));
