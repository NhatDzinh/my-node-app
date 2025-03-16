const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để đọc JSON từ request
app.use(express.json());

// Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://username:password@cluster.mongodb.net/mydatabase";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Mô hình sản phẩm (Product)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
const Product = mongoose.model("Product", productSchema);

// API: Lấy danh sách sản phẩm
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy danh sách sản phẩm" });
  }
});

// API: Thêm sản phẩm mới
app.post("/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Lỗi thêm sản phẩm" });
  }
});

// API: Tìm kiếm sản phẩm theo tên
app.get("/products/search", async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Product.find({ name: new RegExp(name, "i") });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Lỗi tìm kiếm sản phẩm" });
  }
});

// API: Cập nhật sản phẩm theo ID
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Lỗi cập nhật sản phẩm" });
  }
});

// API: Xóa sản phẩm theo ID
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xóa sản phẩm" });
  }
});

// Chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
