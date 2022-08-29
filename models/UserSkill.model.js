const mongoose = require('mongoose');

const { user } = require('../controllers/');


const companyOfferSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, 'Introduzca el nombre de la posición']
    },
    salary: {
        type: Number,
        required: [true, 'Introduzca el salario neto de la posición por horas']
    },
    contractType: {
        type: String,
        required: [true, 'Introduzca el tipo de contrato']
    },
    minExperience: {
        type: String,
    },
    description: {
        type: String,
    }
})

const CompanyOffer = mongoose.model('CompanyOffer', companyOfferSchema);

module.exports = CompanyOffer;