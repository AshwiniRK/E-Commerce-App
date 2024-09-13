const express = require('express');
const { addOrder, updateOrderStatus, calculateMonthlyRevenue } = require('../controller/orderController');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const order = await addOrder(req.body);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/update/:orderId', async (req, res) => {
    try {
        const order = await updateOrderStatus(req.params.orderId, req.body.status);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/revenue', async (req, res) => {
    try {
        const { month, year } = req.query;
        console.log("month",month);
        console.log("year",year);
        const revenue = await calculateMonthlyRevenue(parseInt(month), parseInt(year));
        res.json({ totalRevenue: revenue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;