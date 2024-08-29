const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const cors = require('cors');
require('dotenv').config()
// const jwt = require('jsonwebtoken');

const MONGO_URL = process.env.MONGO_URL

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH', 
    allowedHeaders: 'Content-Type,Authorization'
}));

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use('/', userRoutes);
app.use('/admin', adminRoutes)
app.use('/uploads',express.static("uploads"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Open in browser: http://localhost:${PORT}`);
});
