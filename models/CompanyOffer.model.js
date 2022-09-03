const mongoose = require('mongoose');

const companyOfferSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'La empresa es necesaria']
    },
    jobTitle: {
        type: String,
        required: [true, 'Introduzca el nombre de la posición']
    },
    salary: {
        type: Number,
        required: [true, 'Introduzca el salario neto de la posición por horas']
    },
    jobType: { // Partial o full time
        type: String,
        enum: ['Tiempo completo', 'Tiempo parcial'],
        default: 'Tiempo completo'
    },
    contractType: { // undefined, temporal, etc...
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