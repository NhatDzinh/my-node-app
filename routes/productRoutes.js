const express = require('express');
const Product = require('../models/Product'); // Import model
const router = express.Router();

// 🟢 Lấy danh sách tất cả sản phẩm
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔵 Thêm sản phẩm mới
router.post('/products', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🟡 Cập nhật sản phẩm theo ID
router.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔴 Xóa sản phẩm theo ID
router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        res.json({ message: "Sản phẩm đã được xóa!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
