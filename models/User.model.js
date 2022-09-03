const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Introduce tu nombre']
    },
    lastName: {
        type: String,
        required: [true, 'Introduce tu apellido']
    },
    birthday: {
        type: Date,
    },
    email: {
        type: String,
        required: [true, 'El email es necesario'],
        unique: true,
        match: [EMAIL_PATTERN, 'El formato de email es inválido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        match: [PASSWORD_PATTERN, 'La contraseña es inválida'],
    },
    phoneNumber: {
        type: String,
    },
    image: {
        type: String,
        default: '.images/user-image-default.png'
    },
    googleID: {
        type: String
    },
    isCompany: {
        type: Boolean,
        default: false,
        required: [true, 'Obligatorio']
    }
})

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt
            .hash(user.password, SALT_ROUNDS)
            .then((hash) => {
                user.password = hash;
                next();
            })
            .catch(err => next(err));
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;