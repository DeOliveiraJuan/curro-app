const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
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
})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;