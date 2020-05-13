const mongoose = require('mongoose')

const practitionerSchema = new mongoose.Schema({
    honorific: {
        type: String,
        enum: ['', 'Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Mx', 'M', 'Sir', 'Madam', 'Dr', 'Prof'],
        default: ''
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
    jobLevel: { type: String, trim: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

practitionerSchema.virtual('consultations', {
    ref: 'Consultation',
    localField: '_id',
    foreignField: 'practitionerId'
})

practitionerSchema.methods.toJSON = function() {
    const practitioner = this;
    const practitionerObject = practitioner.toObject()

    delete practitionerObject.createdAt
    delete practitionerObject.updatedAt
    delete practitionerObject.__v
    delete practitionerObject._id

    return practitionerObject
}

const Practitioner = mongoose.model('Practitioner', practitionerSchema)


module.exports = Practitioner