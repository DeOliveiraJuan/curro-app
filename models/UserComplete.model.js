const mongoose = require('mongoose');

const userCompleteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: [true, 'Introduce tu dirección de vivienda']
    },
    city: {
        type: String,
        required: [true, 'Introduce tu ciudad']
    },
    zipCode: {
        type: Number,
        required: [true, 'Introduce tu código postal']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Introduce tu número de teléfono']
    },
    idPhoto: {
        type: String
    },
    workPermit: {
        type: Boolean,
        default: false,
    },
    europeanNationality: {
        type: Boolean,
        default: false,
    } 
})

const UserComplete = mongoose.model('UserComplete', userCompleteSchema);

module.exports = UserComplete;