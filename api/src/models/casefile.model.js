const mongoose = require('mongoose')

const casefileSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    name: { type: String, required: true, trim: true }
}, {
    timestamps: true
})

casefileSchema.virtual('consultations', {
    ref: 'Consultation',
    localField: '_id',
    foreignField: 'casefileId'
})

const Casefile = mongoose.model('Casefile', casefileSchema)

module.exports = Casefile