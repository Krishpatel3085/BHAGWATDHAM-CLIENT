const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    studentId: {
        type: String
    },
    age: {
        type: Number,
    },
    grade: {
        type: String,
    },
    parentName: {
        type: String,
    },
    parentPhone: {
        type: Number,
    },
    address: {
        type: String,
    },
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String
    },
    gender:{
        type: String,
    },

    Fees: [{
        TotalAmount: {
            type: Number
        },
        PaidAmount: {
            type: Number,
            defaultValue: 0,
        },
        status: {
            type: String,
            default: 'pending',
        },
        dueDate: {
            type: String
        },
        paymentMethod: {
            type: String
        },
        lastPaymentDate: {
            type: String
        },
        receiptNo:{
            type: String
        }
    }],

}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);