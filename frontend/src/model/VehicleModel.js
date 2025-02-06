const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    vin: {
        type: String,
        required: true,
        unique: true,
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
    }]
});

// Check if the model is already defined
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
