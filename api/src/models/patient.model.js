const mongoose = require('mongoose');
const Casefile = require('./casefile.model');

const patientSchema = new mongoose.Schema(
  {
    honorific: {
      type: String,
      enum: ['NoTitle', 'Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Mx', 'M', 'Sir', 'Madam', 'Dr', 'Prof'],
      default: 'NoTitle'
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
    occupation: { type: String, trim: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

patientSchema.virtual('casefiles', {
  ref: 'Casefile',
  localField: '_id',
  foreignField: 'patientId'
});

patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();

  delete patientObject.__v;
  delete patientObject._id;
  delete patientObject.createdAt;
  if (patientObject.casefiles) {
    patientObject.casefiles.forEach((c) => {
      c.id = c._id;
      delete c._id;
      delete c.updatedAt;
    });
  }

  return patientObject;
};

// Delete cascade - delete all casefiles for patient when the patient is removed
patientSchema.pre('remove', async function (next) {
  const patient = this;
  const casefiles = await Casefile.find({ patientId: patient._id });
  casefiles.forEach((c) => c.remove());
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
