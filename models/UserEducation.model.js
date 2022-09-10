const mongoose = require('mongoose');

const userEducationSchema = new mongoose.Schema({
    user: {

    },
    institutionName: {
        type: String,
        required: [true, 'Introduce el nombre de la empresa']
    },
    typeOfStudy: {
        type: String,
        required: [true, 'Introduce el nombre de la posición']
    },
    fieldOfStudy: {
        type: String,
        required: [true, 'Introduce el nombre de la posición']
    },
    startDate: {
        type: Date,
        required: [true, 'Introduce la fecha de inicio']
    },
    endDate: {
        type: Date,
        required: [true, 'Introduce la fecha de culminación']
    }
})

const UserEducation = mongoose.model('UserEducation', userEducationSchema);

module.exports = UserEducation;