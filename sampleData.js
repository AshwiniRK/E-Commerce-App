// sampleData.js

const mongoose = require('mongoose');
const connectDB = require('./db');
const { addOrder } = require('./controller/orderController');

const loadSampleData = async () => {
    try {
        await connectDB();

        // Sample orders data
        const sampleOrders = [
            {
                orderId: 'ORD001',
                customerId: 'CUST001',
                items: [
                    { itemId: 'ITEM001', quantity: 2, price: 100 },
                    { itemId: 'ITEM002', quantity: 1, price: 200 }
                ],
                orderDate: new Date('2024-08-01'),
                status: 'Completed'
            },
            {
                orderId: 'ORD002',
                customerId: 'CUST002',
                items: [
                    { itemId: 'ITEM003', quantity: 1, price: 150 },
                    { itemId: 'ITEM004', quantity: 3, price: 50 }
                ],
                orderDate: new Date('2024-08-15'),
                status: 'Pending'
            },
            {
                orderId: 'ORD003',
                customerId: 'CUST003',
                items: [
                    { itemId: 'ITEM005', quantity: 4, price: 25 },
                    { itemId: 'ITEM006', quantity: 2, price: 75 }
                ],
                orderDate: new Date('2024-08-20'),
                status: 'Completed'
            },
            {
                orderId: 'ORD004',
                customerId: 'CUST004',
                items: [
                    { itemId: 'ITEM007', quantity: 1, price: 300 },
                    { itemId: 'ITEM008', quantity: 2, price: 50 }
                ],
                orderDate: new Date('2024-09-05'),
                status: 'Cancelled'
            }
        ];

        // Insert sample data
        for (const order of sampleOrders) {
            await addOrder(order);
        }

        console.log('Sample data loaded successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error loading sample data:', err);
        mongoose.connection.close();
    }
};

loadSampleData();
