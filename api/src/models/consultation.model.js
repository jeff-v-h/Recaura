const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectiveSchema = new Schema({
    moi: { type: String },
    currentHistory: { type: String },
    bodyChart: { type: String },
    aggravatingFactors: { type: String },
    easingFactors: { type: String },
    vas: { type: String },
    pastHistory: { type: String },
    socialHistory: { type: String },
    imaging: { type: String },
    generalHealth: { type: String }
})

const objectiveSchema = new Schema({
    observation: { type: String },
    active: { type: String },
    passive: { type: String },
    resistedIsometric: { type: String },
    functionalTests: { type: String },
    neurologicalTests: { type: String },
    specialTests: { type: String },
    palpation: { type: String},
    additional: { type: String }
})

const consultationSchema = new Schema({
    date: { type: Date,  default: new Date() },
    number: { type: Number, default: 1 },
    practitioner: { type: Schema.Types.ObjectId, ref: 'Practitioner' },
    subjectiveAssessment: subjectiveSchema,
    objectiveAssessment: objectiveSchema,
    treatments: { type: String, required: true },
    plans: { type: String, required: true }
}, {
    timestamps: true
})

// setup virtual property to reference casefiles for user
// patientSchema.virtual('casefiles', {
//     ref: 'Casefile',
//     localField: '_id',
//     foreignField: 'patientId'
// })

const Consultation = mongoose.model('Consultation', consultationSchema)

module.exports = Consultation