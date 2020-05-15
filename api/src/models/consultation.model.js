const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

const objectiveSchema = new Schema({
  observation: { type: String },
  active: { type: String },
  passive: { type: String },
  resistedIsometric: { type: String },
  functionalTests: { type: String },
  neurologicalTests: { type: String },
  specialTests: { type: String },
  palpation: { type: String },
  additional: { type: String }
});

const consultationSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    casefileId: { type: Schema.Types.ObjectId, ref: 'Casefile', required: true },
    date: { type: Date, default: new Date() },
    number: { type: Number, default: 1, min: 1 },
    practitionerId: { type: Schema.Types.ObjectId, ref: 'Practitioner', required: true },
    subjectiveAssessment: subjectiveSchema,
    objectiveAssessment: objectiveSchema,
    treatments: { type: String },
    plans: { type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

consultationSchema.virtual('patient', {
  ref: 'Patient',
  localField: 'patientId',
  foreignField: '_id',
  justOne: true
});

consultationSchema.virtual('casefile', {
  ref: 'Casefile',
  localField: 'casefileId',
  foreignField: '_id',
  justOne: true
});

consultationSchema.virtual('practitioner', {
  ref: 'Practitioner',
  localField: 'practitionerId',
  foreignField: '_id',
  justOne: true
});

consultationSchema.methods.toJSON = function () {
  const consultation = this;
  const consultationObject = consultation.toObject();

  delete consultationObject.__v;
  delete consultationObject._id;
  delete consultationObject.createdAt;
  delete consultationObject.updatedAt;
  if (consultationObject.subjectiveAssessment) delete consultationObject.subjectiveAssessment._id;
  if (consultationObject.objectiveAssessment) delete consultationObject.objectiveAssessment._id;
  if (consultationObject.practitioner) delete consultationObject.practitioner._id;
  if (consultationObject.patient) delete consultationObject.patient._id;

  return consultationObject;
};

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
