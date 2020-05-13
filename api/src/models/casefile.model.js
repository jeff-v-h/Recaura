const mongoose = require('mongoose')
const Consultation = require('./consultation.model')

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

// Delete cascade - delete all consultations for casefile when the file is removed
casefileSchema.pre('remove', async function(next) {
    const casefile = this
    await Consultation.deleteMany({ casefileId: casefile._id })
    next()
})

const Casefile = mongoose.model('Casefile', casefileSchema)

module.exports = Casefile