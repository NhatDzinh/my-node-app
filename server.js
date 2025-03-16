const express = require('express');
const connectDB = require('./db');

const app = express();

// Kết nối MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('🚀 Server đang chạy và đã kết nối MongoDB!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
