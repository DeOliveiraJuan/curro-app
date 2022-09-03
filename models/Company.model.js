const mongoose = require('mongoose');

const EMAIL_PATTERN =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es necesario']
    },
    name: {
        type: String,
        required: [true, 'El nombre comercial es requerido']
    },
    legalName: {
        type: String,
        required: [true, 'El nombre legal es requerido']
    },
    nif: {
        type: String,
        required: [true, 'El NIF es requerido']
    },
    phoneNumber: {
        type: String,
        required: [true, 'El número de teléfono es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        match: [EMAIL_PATTERN, 'El formato de email es invalido'],
    },
})

const Company = mongoose.model('Company', companySchema);

module.exports = Company;