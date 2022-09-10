const mongoose = require('mongoose');

const userExperienceSchema = new mongoose.Schema({
   
    companyName: {
        type: String,
        required: [true, 'Introduce el nombre de la empresa']
    },
    jobTitle: {
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
    },
    description: {
        type: String,
    }
})

const UserExperince = mongoose.model('UserExperince', userExperienceSchema);

module.exports = UserExperince;