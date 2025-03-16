const mongoose = require('mongoose');
require('dotenv').config(); // Đọc biến môi trường từ file .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ Kết nối MongoDB thất bại:', error);
        process.exit(1); // Dừng chương trình nếu kết nối thất bại
    }
};

module.exports = connectDB;
