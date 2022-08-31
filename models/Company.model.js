const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: [true, 'El número de teléfono es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        match: [EMAIL_PATTERN, 'El formato de email es invalido'],
    },
    password: {
        type: String,
        required: [true, 'Introduce la contraseña'],
        match: [PASSWORD_PATTERN, 'Formato de contraseña inválido'],
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