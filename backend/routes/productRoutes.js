import express from "express";
const router = express.Router();
import products from '../data/products.js';

// Route for all the products
router.get('/', async (req, res) => {
    res.json(products);
});

// Route for single products
router.get('/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
})

export default router;