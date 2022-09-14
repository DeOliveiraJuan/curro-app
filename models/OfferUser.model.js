const mongoose = require('mongoose');


const offerUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es necesario']
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyOffer',
        required: [true, 'La Oferta es necesaria']
    },
    status: {
        type: String,
        enum: ['pending', 'preselected', 'accepted', 'rejected'],
        default: 'pending'
    },
    dates: {
        type: Object,
        default: {
            pending: Date.now(),
        }
    }
})

const offerUser = mongoose.model('offerUser', offerUserSchema);

module.exports = offerUser;