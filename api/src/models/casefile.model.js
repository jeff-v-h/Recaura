const mongoose = require('mongoose')

const casefileSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    name: { type: String, required: true, trim: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

casefileSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientId',
    foreignField: '_id',
    justOne: true
})

casefileSchema.virtual('consultations', {
    ref: 'Consultation',
    localField: '_id',
    foreignField: 'casefileId'
})

casefileSchema.methods.toJSON = function() {
    const casefile = this;
    const casefileObject = casefile.toObject()

    delete casefileObject.__v
    delete casefileObject._id
    delete casefileObject.updatedAt
    if (casefileObject.patient)
        delete casefileObject.patient._id

    return casefileObject
}

const Casefile = mongoose.model('Casefile', casefileSchema)

module.exports = Casefile