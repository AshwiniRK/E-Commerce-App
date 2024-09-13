const express = require('express');
const connectDB = require('./db');
const orderRoutes = require('./router/orderRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));