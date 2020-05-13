const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectiveSchema = new Schema({
    moi: { type: String },
    currentHistory: { type: String },
    bodyChart: { type: String },
    aggravatingFactors: { type: String },
    easingFactors: { type: String },
    vas: { type: String, min: 0, max: 10 },
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
    casefileId: { type: Schema.Types.ObjectId, ref: 'Casefile', required: true },
    date: { type: Date,  default: new Date() },
    number: { type: Number, default: 1, min: 1 },
    practitionerId: { type: Schema.Types.ObjectId, ref: 'Practitioner', required: true },
    subjectiveAssessment: subjectiveSchema,
    objectiveAssessment: objectiveSchema,
    treatments: { type: String },
    plans: { type: String }
}, {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
})

consultationSchema.virtual('casefile', {
    ref: 'Casefile',
    localField: 'casefileId',
    foreignField: '_id'
})

consultationSchema.virtual('practitioner', {
    ref: 'Practitioner',
    localField: 'practitionerId',
    foreignField: '_id'
})

// These virtuals will be automatically populated without needing to call .populate
// consultationSchema.virtual('casefile').get(function() {
//     return this.patient.casefiles ? this.patient.casefiles.id(this.casefileId) : null
// })

// consultationSchema.virtual('casefile').set(function(casefile) {
//     this.casefileId = casefile;
// })

consultationSchema.methods.toJSON = function() {
    const consultation = this;
    const consultationObject = consultation.toObject()

    delete consultationObject.__v

    return consultationObject
}

const Consultation = mongoose.model('Consultation', consultationSchema)

module.exports = Consultation