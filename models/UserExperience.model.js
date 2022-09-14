const mongoose = require('mongoose');

const userExperienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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

const UserExperience = mongoose.model('UserExperience', userExperienceSchema);

module.exports = UserExperience;