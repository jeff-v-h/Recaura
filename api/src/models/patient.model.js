const mongoose = require('mongoose')

const casefileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const patientSchema = new mongoose.Schema({
    honorific: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Mx', 'M', 'Sir', 'Madam', 'Dr', 'Prof'],
        default: 'Mr'
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    countryCode: {
        type: String,
        trim: true
    },
    homePhone: {
        type: String,
        trim: true
    },
    mobilePhone: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['preferNotToSay', 'male', 'female', 'other'],
        default: 'preferNotToSay'
    },
    occupation: {
        type: String,
        trim: true
    },
    casefiles: [casefileSchema]
}, {
    timestamps: true
})

// setup virtual property to reference casefiles for user
// patientSchema.virtual('casefiles', {
//     ref: 'Casefile',
//     localField: '_id',
//     foreignField: 'patientId'
// })

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient