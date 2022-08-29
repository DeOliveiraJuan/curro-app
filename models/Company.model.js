const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { company } = require('../controllers/companyProfile.controller');

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const companySchema = new mongoose.Schema({
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
        required: [true, 'El número de teléfono es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario'],
        unique: true,
        match: [EMAIL_PATTERN, 'El formato de email es invalido'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [PASSWORD_PATTERN, 'Password is not valid'],
    }
})

companySchema.pre('save', function (next) {
    const company = this;

    if (company.isModified('password')) {
        bcrypt
            .hash(company.password, SALT_ROUNDS)
            .then((hash) => {
                company.password = hash;
                next();
            })
            .catch(err => next(err));
    } else {
        next();
    }
})

companySchema.methods.checkPassword = function(password) {
    const company = this;
    return bcrypt.compare(password, company.password);
}

const Company = mongoose.model('Compamy', companySchema);

module.exports = Company;