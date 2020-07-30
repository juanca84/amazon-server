const router = require('express').Router();
const Product = require('../models/product');

const upload = require("../middlewares/upload-photo");

// POST request - create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save()

        res.json({
            status: true,
            message: "Successfully saved"
        });
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
});

// GET request - get all products
router.get('/products', async(req, res) => {
    try {
        let products = await Product.find();
        res.json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - create  a single product
router.get('/products/:id', async(req, res) => {
    try {
        let products = await Product.findOne({ _id: req.params.id });
        res.json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// PUT request - update a single product
// DELETE request - delete a single product
module.exports = router;