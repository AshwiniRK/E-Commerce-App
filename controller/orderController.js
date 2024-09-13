const Order = require('../models/Order');

const addOrder = async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    return order;
};


const updateOrderStatus = async (orderId, newStatus) => {
    const order = await Order.findOneAndUpdate(
        { orderId },
        { status: newStatus },
        { new: true }
    );
    return order;
};



const calculateMonthlyRevenue = async (month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    console.log(startDate,endDate);

    const revenue = await Order.aggregate([
        {
            $match: {
                status: 'Completed',
                orderDate: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalCost' }
            }
        }
    ]);
    console.log("revenue",revenue);

    return revenue[0]?.totalRevenue || 0;
};

module.exports = { 
    calculateMonthlyRevenue,
    addOrder,
    updateOrderStatus
 };