const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // 🟢 Khởi tạo app trước khi sử dụng

app.use(express.json()); // 🟢 Đặt middleware ngay sau khi khởi tạo app

const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Kết nối MongoDB thành công!");
}).catch(err => {
    console.log("❌ Kết nối MongoDB thất bại:", err);
});

// Import routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes); // 🟢 Đặt route sau middleware JSON

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
