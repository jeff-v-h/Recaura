const mongoose = require('mongoose')

const practitionerSchema = new mongoose.Schema({
    honorific: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Mx', 'M', 'Sir', 'Madam', 'Dr', 'Prof'],
        default: 'Mr'
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    email: { type: String, trim: true },
    countryCode: { type: String, trim: true },
    homePhone: { type: String, trim: true },
    mobilePhone: { type: String, trim: true },
    gender: {
        type: String,
        enum: ['preferNotToSay', 'male', 'female', 'other'],
        default: 'preferNotToSay'
    },
    profession: { type: String, trim: true },
    jobLevel: { type: String, trim: true },
    casefiles: [casefileSchema]
}, {
    timestamps: true
})

const Practitioner = mongoose.model('Practitioner', practitionerSchema)

module.exports = Practitioner