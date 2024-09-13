const assert = require('assert');
const mongoose = require('mongoose');
const connectDB = require('../db'); 
const Order = require('../models/Order'); 
const { addOrder, updateOrderStatus, calculateMonthlyRevenue } = require('../controller/orderController');

(async function runTests() {
  await connectDB(); 

  try {
    // Test: Add Order and Calculate Total Cost
    const orderData = {
      orderId: 'testOrder123',
      customerId: 'testCustomer',
      items: [
        { itemId: 'item1', quantity: 2, price: 10 },
        { itemId: 'item2', quantity: 1, price: 20 }
      ],
      status: 'Pending'
    };

    await addOrder(orderData);
    let order = await Order.findOne({ orderId: 'testOrder123' });
    assert(order, 'Order should be added');
    assert.strictEqual(order.totalCost, 40, 'Total cost should be 40');

    // Test: Update Order Status
    await updateOrderStatus('testOrder123', 'Completed');
    order = await Order.findOne({ orderId: 'testOrder123' });
    assert(order, 'Order should exist');
    assert.strictEqual(order.status, 'Completed', 'Order status should be Completed');

    // Test: Calculate Monthly Revenue
    await addOrder({
      orderId: 'order1',
      customerId: 'cust1',
      items: [{ itemId: 'item1', quantity: 1, price: 10 }],
      orderDate: new Date('2024-09-15'),
      status: 'Completed'
    });
    await addOrder({
      orderId: 'order2',
      customerId: 'cust2',
      items: [{ itemId: 'item2', quantity: 2, price: 20 }],
      orderDate: new Date('2024-09-25'),
      status: 'Completed'
    });

    const revenue = await calculateMonthlyRevenue(9, 2024);
    assert.strictEqual(revenue, 50, 'Monthly revenue should be 50');

    console.log('All tests passed');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    mongoose.connection.close(); // Close connection after tests
  }
})();
