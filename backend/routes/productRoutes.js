import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Route for all the products
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({}); //'{}': empty object for all products or pass some options for limited products
    res.json(products);
  })
);

// Route for single products
router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    res.status(404).json({ message: "Product not found" });
  })
);

export default router;
