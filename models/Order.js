const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    customerId: { type: String, required: true },
    items: [ItemSchema],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    totalCost: { type: Number } 
});

OrderSchema.pre('save', function(next) {
    this.totalCost = this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    next();
});

OrderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', OrderSchema);
