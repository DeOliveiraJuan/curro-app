const mongoose = require('mongoose');

const { company } = require('../controllers/companyProfile.controller');


const companyOfferSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, 'Introduzca el nombre de la posición']
    },
    jobType: {
        type: String
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